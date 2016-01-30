import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createTeam: function() {
      this.attrs.createTeam(this.get('name'));
    }
  }
});
