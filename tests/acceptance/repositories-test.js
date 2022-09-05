import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'orgs/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | repositories', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    const organization = this.server.create('organization');
    this.server.createList('repository', 30, {
      organization: organization,
    });

    this.setProperties({
      organization,
    });
  });

  test('should fetch repositories after clicking show repos button', async function (assert) {
    assert.expect(4);

    await visit('/');

    await fillIn('[data-test-org-search-input]', this.organization.login);

    await click('[data-test-org-search-button]');

    assert.strictEqual(
      currentURL(),
      `/organizations/${this.organization.login}`
    );

    assert.dom('[data-test-org-show-name]').hasText(this.organization.name);

    await click('[data-test-org-show-repo-link]');

    assert.strictEqual(
      currentURL(),
      `/organizations/${this.organization.login}/repositories`
    );

    assert.dom('[data-test-repository-repo]').exists({ count: 30 });
  });

  test('should redirect to index route with error when 404', async function (assert) {
    assert.expect(1);

    try {
      await visit('/organizations/fakeorg/repositories');
    } catch (e) {}

    assert.strictEqual(currentURL(), '/');
  });

  test('logo button should redirect to index route', async function (assert) {
    assert.expect(1);

    await visit(`/organizations/${this.organization.login}/repositories`);

    await click('[data-test-logo]');

    assert.strictEqual(currentURL(), '/');
  });
});
