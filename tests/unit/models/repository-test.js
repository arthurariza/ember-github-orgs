import { module, test } from 'qunit';
import { setupTest } from 'orgs/tests/helpers';

module('Unit | Model | repository', function (hooks) {
  setupTest(hooks);

  test('belongs to an organization', function (assert) {
    const repository = this.owner
      .lookup('service:store')
      .modelFor('repository');

    const relationship = repository.relationshipsByName.get('organization');

    assert.equal(
      relationship.key,
      'organization',
      'belongs to an organization'
    );
    assert.equal(relationship.kind, 'belongsTo', 'relationship is belongsTo');
  });

  test('has many branches', function (assert) {
    const repository = this.owner
      .lookup('service:store')
      .modelFor('repository');

    const relationship = repository.relationshipsByName.get('branches');

    assert.equal(relationship.key, 'branches', 'has many branches');
    assert.equal(relationship.kind, 'hasMany', 'relationship is hasMany');
  });
});
