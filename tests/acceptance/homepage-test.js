import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'orgs/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | homepage', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should redirect to organizations/show', async function (assert) {
    assert.expect(2);

    const organization = this.server.create('organization');

    await visit('/');

    await fillIn('[data-test-org-search-input]', organization.login);

    await click('[data-test-org-search-button]');

    assert.strictEqual(
      currentURL(),
      `/organizations/${organization.login}`,
      'User is redirected to correct route'
    );

    assert.dom('[data-test-org-show-name]').hasText(organization.name);
  });

  test('should redirect to index route with error when 404', async function (assert) {
    assert.expect(1);

    try {
      await visit('/organizations/fakeorg');
    } catch (e) {
      console.log(e);
    }

    assert.strictEqual(currentURL(), '/');
  });

  test('logo button should redirect to index route', async function (assert) {
    assert.expect(1);

    const organization = this.server.create('organization');

    await visit(`/organizations/${organization.login}`);

    await click('[data-test-logo]');

    assert.strictEqual(currentURL(), '/');
  });
});
