import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'orgs/tests/helpers';

module('Acceptance | homepage', function (hooks) {
  setupApplicationTest(hooks);

  test('should redirect to organizations/show', async function (assert) {
    assert.expect(2);

    await visit('/');

    await fillIn('[data-test-org-search-input]', 'rails');

    await click('[data-test-org-search-button]');

    assert.strictEqual(currentURL(), '/organizations/rails');

    assert.dom('[data-target-org-show-name]').hasText('Ruby on Rails');
  });
});
