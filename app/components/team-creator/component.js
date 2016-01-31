import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['creator-input-fields'],
  actions: {
    createTeam: function() {
      this.attrs.createTeam(this.get('name'));
    }
  }
});
