import { moduleForModel, test } from 'ember-qunit';

moduleForModel('engineer', 'Unit | Model | engineer', {
  // Specify the other units that are required for this test.
  needs: ['model:team', 'model:time-slice']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
