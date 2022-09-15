import { module, test } from 'qunit';
import { setupTest } from 'orgs/tests/helpers';

module('Unit | Controller | repositories', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:repositories');
    assert.ok(controller);
  });
});
