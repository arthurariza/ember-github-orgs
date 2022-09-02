import { module, test } from 'qunit';
import { setupTest } from 'orgs/tests/helpers';
import { get } from '@ember/object';

module('Unit | Model | organization', function (hooks) {
  setupTest(hooks);

  test('has many repositories', function (assert) {
    const organization = this.owner
      .lookup('service:store')
      .modelFor('organization');

    const relationship = organization.relationshipsByName.get('repositories');

    assert.equal(relationship.key, 'repositories', 'has many repositories');
    assert.equal(relationship.kind, 'hasMany', 'relationship is hasMany');
  });
});
