import { module, test } from 'qunit';
import { setupRenderingTest } from 'orgs/tests/helpers';
import { render, fillIn } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | repositories/filter', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      repositories: [
        ...this.server.createList('repository', 20),
        ...this.server.createList('repository', 15, {
          language: 'JavaScript',
        }),
        ,
      ],
    });
  });

  test('renders all repositories by default', async function (assert) {
    assert.expect(5);

    await render(hbs`<Repositories @repositories={{this.repositories}}/>`);

    assert
      .dom('[data-test-repository-filter-title]')
      .exists()
      .hasText('Repositories');

    assert.dom('[data-test-repository-filter-input]').exists();

    assert.dom('[data-test-repository-not-found]').doesNotExist();

    assert.dom('[data-test-repository-repo]').exists({ count: 35 });
  });

  test('filters repositories by language and ignores casing', async function (assert) {
    assert.expect(8);

    await render(hbs`<Repositories @repositories={{this.repositories}}/>`);

    assert
      .dom('[data-test-repository-filter-title]')
      .exists()
      .hasText('Repositories');

    assert.dom('[data-test-repository-filter-input]').exists();

    assert.dom('[data-test-repository-not-found]').doesNotExist();

    await fillIn('[data-test-repository-filter-input]', 'ruby');

    assert.dom('[data-test-repository-repo]').exists({ count: 20 });

    await fillIn('[data-test-repository-filter-input]', 'rUBy');

    assert.dom('[data-test-repository-repo]').exists({ count: 20 });

    await fillIn('[data-test-repository-filter-input]', 'javascript');

    assert.dom('[data-test-repository-repo]').exists({ count: 15 });

    await fillIn('[data-test-repository-filter-input]', 'JAVAscript');

    assert.dom('[data-test-repository-repo]').exists({ count: 15 });
  });

  test('renders not found message when language wasnt found', async function (assert) {
    assert.expect(7);

    await render(hbs`<Repositories @repositories={{this.repositories}}/>`);

    assert
      .dom('[data-test-repository-filter-title]')
      .exists()
      .hasText('Repositories');

    assert.dom('[data-test-repository-filter-input]').exists();

    assert.dom('[data-test-repository-not-found]').doesNotExist();

    await fillIn('[data-test-repository-filter-input]', 'RubyScript');

    assert
      .dom('[data-test-repository-not-found]')
      .exists()
      .hasText('No Results Found');

    assert.dom('[data-test-repository-repo]').doesNotExist();
  });
});
