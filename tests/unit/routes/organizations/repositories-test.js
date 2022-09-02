import { module, test } from 'qunit';
import { setupTest } from 'orgs/tests/helpers';

module('Unit | Route | organizations/repositories', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:organizations/repositories');
    assert.ok(route);
  });
});
