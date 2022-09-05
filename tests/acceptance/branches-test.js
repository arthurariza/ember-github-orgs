import { module, test } from 'qunit';
import {
  fillIn,
  click,
  visit,
  currentURL,
  pauseTest,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'orgs/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | branches', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    const organization = this.server.create('organization');
    const repository = this.server.create('repository', {
      organization: organization,
    });

    this.server.createList('branch', 10, {
      repository: repository,
    });

    this.setProperties({
      organization,
      repository,
    });
  });

  test('should fetch branches after clicking show branches button', async function (assert) {
    assert.expect(8);

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

    assert.dom('[data-test-repository-repo]').exists();

    await click('[data-test-repository-branches-link]');

    assert.strictEqual(
      currentURL(),
      `/organizations/${this.organization.login}/repositories/${this.repository.name}/branches`
    );

    assert.dom('[data-test-branches-list-item]').exists({ count: 10 });

    assert
      .dom('[data-test-branches-length]')
      .exists()
      .hasText('Number Of Branches: 10');
  });

  test('should redirect to repositories route with error when 404', async function (assert) {
    assert.expect(1);

    try {
      await visit(
        `/organizations/${this.organization.login}/repositories/fakerepo/branches`
      );
    } catch (e) {}

    assert.strictEqual(
      currentURL(),
      `/organizations/${this.organization.login}/repositories`
    );
  });

  test('logo button should redirect to index route', async function (assert) {
    assert.expect(1);

    await visit(`/organizations/${this.organization.login}/repositories`);

    await click('[data-test-logo]');

    assert.strictEqual(currentURL(), '/');
  });
});
