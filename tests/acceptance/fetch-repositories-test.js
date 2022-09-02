import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'orgs/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | fetch repositories', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should fetch repositories after clicking show repos button', async function (assert) {
    assert.expect(2);

    await visit('/');

    await fillIn('[data-test-org-search-input]', 'rails');

    await click('[data-test-org-search-button]');

    assert.strictEqual(currentURL(), '/organizations/rails');

    assert.dom('[data-target-org-show-name]').hasText('Ruby on Rails');

    await click('[data-target-org-show-repo-link]');

    assert.strictEqual(currentURL(), '/organizations/rails/repositories');

    assert.dom('[data-test-repository-repo]').exists({ count: 30 });
  });
});
