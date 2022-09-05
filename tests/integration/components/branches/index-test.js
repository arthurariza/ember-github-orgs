import { module, test } from 'qunit';
import { setupRenderingTest } from 'orgs/tests/helpers';
import { pauseTest, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | branches/index', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('renders all branches with name and number of branches', async function (assert) {
    assert.expect(7);

    const branches = this.server.createList('branch', 30);

    this.set('branches', branches);

    await render(hbs`<Branches @branches={{this.branches}} />`);

    assert.dom('[data-test-branches]').exists();

    assert
      .dom('[data-test-branches-length]')
      .exists()
      .hasText('Number Of Branches: 30');

    assert.dom('[data-test-branches-list]').exists();

    assert.dom('[data-test-branches-list-item]').exists({ count: 30 });

    assert
      .dom('[data-test-branches-list-item]:first-child')
      .hasText(this.branches[0].name);

    assert
      .dom('[data-test-branches-list-item]:last-child')
      .hasText(this.branches[29].name);
  });
});
