import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['js-team', 'team-listing'],
  classNameBindings: [ 'dragClass' ],
  dragClass: 'team-listing--deactivated',

  dragLeave(event) {
    event.preventDefault();
    this.set('dragClass', 'team-listing--deactivated');
  },

  dragOver(event) {
    event.preventDefault();
    this.set('dragClass', 'team-listing--activated');
  },

  drop(event) {
    var data = event.dataTransfer.getData('text/data');
    this.attrs.moveEngineer(data, this.get('team'));
    this.set('dragClass', 'team-listing--deactivated');
  },

  actions: {
    deleteTeam: function() {
      this.attrs.deleteTeam(this.get('team'));
    },

    deleteEngineer: function(engineer) {
      this.attrs.deleteEngineer(engineer);
    }
  }
});
