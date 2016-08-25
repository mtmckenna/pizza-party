import Ember from 'ember';
import TimeSliceCloner from '../service-objects/time-slice-cloner';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('timeSlice').then((timeSlices) => {
      return this.createNowTimeSlice(timeSlices);
    });
  },

  afterModel: function() {
    this.store.findAll('team').then(() => {
      this.store.findAll('engineer');
    });
  },

  createNowTimeSlice(timeSlices) {
    if (!timeSlices.get('length')) {
      var timeSlice = this.store.createRecord('timeSlice', { name: 'Now' });
      timeSlice.save();
      timeSlices = this.store.peekAll('timeSlice');
    }

    return timeSlices;
  },

  actions: {
    copyTimeSlice(timeSlice) {
      new TimeSliceCloner(timeSlice, this.store).saveClonedCopy();
    },

    createEngineer(name, timeSlice) {
      var newEngineer = this.store.createRecord('engineer', { name: name, timeSlice: timeSlice });
      return newEngineer.save();
    },

    deleteEngineer(engineer) {
      engineer.destroyRecord();
    },

    moveEngineer(engineerId, team) {
      var engineer = this.store.peekRecord('engineer', engineerId);
      engineer.set('team', team);
      engineer.save();
    },

    createTeam(name, timeSlice) {
      var newTeam = this.store.createRecord('team', { name: name, timeSlice: timeSlice });
      return newTeam.save();
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
