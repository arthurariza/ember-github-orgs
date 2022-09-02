import { module, test } from 'qunit';
import { setupRenderingTest } from 'orgs/tests/helpers';
import { typeIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | organizations/search', function (hooks) {
  setupRenderingTest(hooks);

  test('should render with no state', async function (assert) {
    assert.expect(4);

    await render(hbs`<Organizations::Search />`);

    assert.dom('[data-test-org-search-title]').hasText('Search');

    assert
      .dom('[data-test-org-search-label]')
      .hasText('GitHub Organization Name:');

    assert
      .dom('[data-test-org-search-input]')
      .hasText('')
      .hasProperty('type', 'text');
  });
});
