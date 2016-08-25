export default class TimeSliceCloner {
  constructor(originalTimeSlice, store) {
    this.originalTimeSlice = originalTimeSlice;
    this.store = store;
  }

  get clonedSlice () {
    var name = this.originalTimeSlice.get('name');

    if (!this._clonedSlice) {
      this._clonedSlice = this.store.createRecord('timeSlice', { name: name });
      this._clonedSlice.save();
    }

    return this._clonedSlice;
  }

  cloneTeams() {
    this.originalTimeSlice.get('teams').forEach((originalTeam) => {
      var engineers = originalTeam.get('engineers');
      var name = originalTeam.get('name');

      var team = this.store.createRecord('team', {
        name: name,
        timeSlice: this.clonedSlice
      });

      team.save().then((team) => {
        this.cloneEngineersIntoTeam(engineers, team);
      });
    });
  }

  cloneEngineersIntoTeam(engineers, team) {
    engineers.forEach((originalEngineer) => {
      var name = originalEngineer.get('name');
      var engineer = this.store.createRecord('engineer', {
        name: name,
        timeSlice: this.clonedSlice,
        team: team
      });

      engineer.save();
    });
  }

  cloneFreeAgents() {
    this.originalTimeSlice.get('engineers').forEach((originalEngineer) => {
      if (!originalEngineer.get('team').get('content')) {
        var name = originalEngineer.get('name');
        this.store.createRecord('engineer', {
          name: name,
          timeSlice: this.clonedSlice
        });
      }
    });
  }

  saveClonedCopy () {
    this.cloneTeams();
    this.cloneFreeAgents();
    return this.clonedSlice;
  }
}
