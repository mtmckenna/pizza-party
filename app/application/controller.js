import Ember from 'ember';

export default Ember.Controller.extend({
  teamSorting: ['order'],
  orderedTeams: Ember.computed.sort('model.teams', 'teamSorting'),
  headCount: Ember.computed('model.engineers.@each.team', function() {
    var totalEngineers = this.get('model').get('engineers').get('length');
    var totalFreeAgents = this.get('freeAgents').get('engineers').get('length');
    return totalEngineers - totalFreeAgents;
  }),

  freeAgents: Ember.computed('model.engineers.@each.team', function() {
    var engineers = this.get('model').get('engineers').filter(function(engineer) {
      return !engineer.get('team').get('id');
    });

    return Ember.Object.create({ engineers: engineers });
  })
});
