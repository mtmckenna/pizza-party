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
      engineer.save();
    },

    createTeam(name) {
      var newTeam = this.store.createRecord('team', { name: name });
      newTeam.save();
    },

    deleteTeam(team) {
      var removeEngineersFromTeam = team.get('engineers').map(function(engineer) {
        engineer.set('team', null);
        return engineer.save();
      });

      Ember.RSVP.all(removeEngineersFromTeam).then(function() {
        return team.destroyRecord();
      });
    }
  }
});
