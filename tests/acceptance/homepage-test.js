import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'orgs/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | homepage', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      organization: this.server.create('organization'),
    });
  });

  test('should redirect to organizations/show', async function (assert) {
    assert.expect(1);

    await visit('/');

    await fillIn('[data-test-org-search-input]', this.organization.login);

    await click('[data-test-org-search-button]');

    assert.strictEqual(
      currentURL(),
      `/organizations/${this.organization.login}`,
      'User is redirected to correct route'
    );
  });

  test('shows organization information', async function (assert) {
    assert.expect(5);

    await visit('/');

    await fillIn('[data-test-org-search-input]', this.organization.login);

    await click('[data-test-org-search-button]');

    assert
      .dom('[data-test-org-show-image]')
      .hasProperty('src', this.organization.avatar_url);

    assert.dom('[data-test-org-show-name]').hasText(this.organization.name);

    assert
      .dom('[data-test-org-show-html-url]')
      .hasProperty('href', this.organization.html_url)
      .hasProperty('target', '_blank');

    assert
      .dom('[data-test-org-show-repo-link]')
      .hasAttribute(
        'href',
        `/organizations/${this.organization.login}/repositories`
      );
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

    await visit(`/organizations/${this.organization.login}`);

    await click('[data-test-logo]');

    assert.strictEqual(currentURL(), '/');
  });
});
