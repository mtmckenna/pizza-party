import { moduleFor, test } from 'ember-qunit';

moduleFor('controller:application', 'Unit | Controller | application', {
   needs: ['model:engineer']
});

// Replace this with your real tests.
test('it works', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
