import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    createEngineer: function() {
      this.attrs.createEngineer(this.get('name'));
    }
  }
});
