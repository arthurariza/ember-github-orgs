import { module, test } from 'qunit';
import { setupTest } from 'orgs/tests/helpers';

module('Unit | Model | branch', function (hooks) {
  setupTest(hooks);

  test('belongs to a repository', function (assert) {
    const branch = this.owner.lookup('service:store').modelFor('branch');

    const relationship = branch.relationshipsByName.get('repository');

    assert.equal(relationship.key, 'repository', 'belongs to aa repository');
    assert.equal(relationship.kind, 'belongsTo', 'relationship is belongsTo');
  });
});
