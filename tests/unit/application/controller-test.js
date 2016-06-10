import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';

moduleFor('controller:application', 'Unit | Controller | application', {
  needs: ['model:engineer'],
});

test('#headCount', function(assert) {
  let controller = this.subject();

  var model = Ember.Object.create({ engineers: [], teams: []});
  controller.set('model', model);
  assert.equal(controller.get('headCount'), 0);

  var assignedEngineer = Ember.Object.create({team: Ember.Object.create({id: 1})});
  var freeAgentEngineer = Ember.Object.create({team: Ember.Object.create(null)});
  controller.get('model').set('engineers', [assignedEngineer, freeAgentEngineer]);
  assert.equal(controller.get('headCount'), 1);
});
