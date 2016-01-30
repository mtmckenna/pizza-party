import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteTeam: function() {
      this.attrs.deleteTeam(this.get('team'));
    }
  }
});
