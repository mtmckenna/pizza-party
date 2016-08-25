import Ember from 'ember';

export default Ember.Component.extend({
  teamSorting: ['order'],

  teams: Ember.computed('timeSlice.teams', function() {
    return this.get('timeSlice').get('teams');
  }),

  engineers: Ember.computed('timeSlice.engineers', function() {
    return this.get('timeSlice').get('engineers');
  }),

  orderedTeams: Ember.computed.sort('teams', 'teamSorting'),

  headCount: Ember.computed('engineers.@each.team', function() {
    var totalEngineers = this.get('engineers').get('length');
    var totalFreeAgents = this.get('freeAgents').get('engineers').get('length');
    return totalEngineers - totalFreeAgents;
  }),

  freeAgents: Ember.computed('engineers.@each.team', function() {
    var engineers = this.get('engineers').filter(function(engineer) {
      return !engineer.get('team').get('content');
    });

    return Ember.Object.create({ engineers: engineers });
  }),
});
