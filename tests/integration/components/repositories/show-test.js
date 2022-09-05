import { module, test } from 'qunit';
import { setupRenderingTest } from 'orgs/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | repositories/show', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('should render repository name, language, private, github link, and link to branches button', async function (assert) {
    assert.expect(7);

    const organization = this.server.create('organization');
    const repository = this.server.create('repository', {
      organization: organization,
    });

    this.set('organization', organization);
    this.set('repository', repository);

    await render(hbs`<Repositories::Show @repository={{this.repository}} />`);

    assert.dom('[data-test-repository-repo]').exists();

    assert
      .dom('[data-test-repository-name]')
      .hasText(`Name: ${this.repository.name}`);

    assert
      .dom('[data-test-repository-language]')
      .hasText(`Language: ${this.repository.language}`);

    assert
      .dom('[data-test-repository-private]')
      .hasText(`Private?: ${this.repository.private}`);

    assert
      .dom('[data-test-repository-github-link]')
      .hasProperty('href', this.repository.html_url);

    assert
      .dom('[data-test-repository-branches-link]')
      .exists()
      .hasText('Show Branches');
  });
});
