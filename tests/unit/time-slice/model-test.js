import { moduleForModel, test } from 'ember-qunit';

moduleForModel('time-slice', 'Unit | Model | time slice', {
  // Specify the other units that are required for this test.
  needs: ['model:engineer', 'model:team']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
