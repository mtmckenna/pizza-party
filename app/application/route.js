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
      var store = this.store;
      var removeEngineersFromTeam = team.get('engineers').map(function(engineer) {
        engineer.set('team', null);

        // This really uhdsufhk piece of code is to handle an error that comes up because of Emberfire, I think...
        return engineer.save().then(function(engineer) {
          var id = engineer.get('id');
          engineer.unloadRecord();
          return store.findRecord('engineer', id);
        });
      });

      Ember.RSVP.all(removeEngineersFromTeam).then(function() {
        team.destroyRecord();
      });
    },

    moveTeam(orderedTeams, team, direction) {
      var otherTeam;
      var otherTeamIndex;
      var currentIndex = orderedTeams.indexOf(team);

      if (direction === 'back') {
        if (orderedTeams.get('firstObject') === team) { return; }
        otherTeamIndex = currentIndex - 1;
      } else if (direction === 'forward') {
        if (orderedTeams.get('lastObject') === team) { return; }
        otherTeamIndex = currentIndex + 1;
      }

      otherTeam = orderedTeams.objectAt(otherTeamIndex);
      otherTeam.set('order', currentIndex);
      otherTeam.save();

      team.set('order', otherTeamIndex);
      team.save();
    }
  }
});
