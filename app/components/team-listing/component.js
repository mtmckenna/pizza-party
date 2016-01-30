import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['js-team'],

  drop(event) {
    var data = event.dataTransfer.getData('text/data');
    this.attrs.moveEngineer(data, this.get('team'));
  },

  dragOver(event) {
    event.preventDefault();
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
