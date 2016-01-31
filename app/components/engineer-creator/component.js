import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['creator-input-fields'],
  actions: {
    createEngineer: function() {
      this.attrs.createEngineer(this.get('name'));
    }
  }
});
