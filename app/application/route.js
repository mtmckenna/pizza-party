import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      teams: this.store.findAll('team'),
      engineers: this.store.findAll('engineer')
    });
  },

  actions: {
    createEngineer(name) {
      var newEngineer = this.store.createRecord('engineer', { name: name });
      newEngineer.save();
    },

    deleteEngineer(engineer) {
      engineer.destroyRecord();
    },

    moveEngineer(engineerId, team) {
      var engineer = this.store.peekRecord('engineer', engineerId);
      engineer.set('team', team);
    },

    createTeam(name) {
      var newTeam = this.store.createRecord('team', { name: name });
      newTeam.save();
    },

    deleteTeam(team) {
      team.destroyRecord();
    }
  }
});
