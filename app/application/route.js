import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      teams: this.store.findAll('team')
    });
  },

  actions: {
    createTeam(name) {
      var newTeam = this.store.createRecord('team', { name: name });
      newTeam.save();
    },

    deleteTeam(team) {
      team.destroyRecord();
    }
  }
});
