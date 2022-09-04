import { assert, module, test } from 'qunit';
import { setupRenderingTest } from 'orgs/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | organizations/show', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('should display organization image, name, github link, and link to repositories', async function (assert) {
    assert.expect(5);

    const model = this.server.create('organization');
    this.set('organization', model);

    await render(
      hbs`<Organizations::Show @organization={{this.organization}} />`
    );

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
});
