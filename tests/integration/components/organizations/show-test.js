import { module, test } from 'qunit';
import { setupRenderingTest } from 'orgs/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | organizations/show', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    assert.expect(4);

    const model = this.server.create('organization');

    this.set('organization', model);

    await render(
      hbs`<Organizations::Show @organization={{this.organization}} />`
    );

    assert
      .dom('[data-target-org-show-image]')
      .hasProperty('src', this.organization.avatar_url);

    assert.dom('[data-target-org-show-name]').hasText(this.organization.name);

    assert
      .dom('[data-target-org-show-html-url]')
      .hasProperty('href', this.organization.html_url)
      .hasProperty('target', '_blank');
  });
});
