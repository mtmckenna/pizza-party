import Ember from 'ember';

export default Ember.Controller.extend({
  freeAgents: Ember.computed('model.engineers.@each.team', function() {
    var engineers = this.store.peekAll('engineer').filter(function(engineer) {
      return !engineer.get('team').get('id');
    });

    return Ember.Object.create({ engineers: engineers });
  }),
});
