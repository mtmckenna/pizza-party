import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deleteEngineer: function() {
      this.attrs.deleteEngineer(this.get('engineer'));
    }
  }
});
