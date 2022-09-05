import { module, test } from 'qunit';
import { setupTest } from 'orgs/tests/helpers';

module('Unit | Model | organization', function (hooks) {
  setupTest(hooks);

  test('has many repositories', function (assert) {
    const organization = this.owner
      .lookup('service:store')
      .modelFor('organization');

    const relationship = organization.relationshipsByName.get('repositories');

    assert.strictEqual(
      relationship.key,
      'repositories',
      'has many repositories'
    );
    assert.strictEqual(relationship.kind, 'hasMany', 'relationship is hasMany');
  });
});
