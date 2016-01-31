import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['js-engineer', 'engineer-listing'],
  attributeBindings: ['draggable'],
  draggable : 'true',

  dragStart(event) {
    var engineerId = this.get('engineer').get('id');
    return event.dataTransfer.setData('text/data', engineerId);
  },

  actions: {
    deleteEngineer: function() {
      this.attrs.deleteEngineer(this.get('engineer'));
    }
  }
});
