import Ember from 'ember';

export default Ember.Controller.extend({
  unassignedEngineers: Ember.computed('model.engineers.@each.team', function() {
    return this.store.peekAll('engineer').filter(function(engineer) {
      return !engineer.get('team').get('id');
    });
  }),
});
