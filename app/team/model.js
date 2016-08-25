import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  order: DS.attr('number'),
  engineers: DS.hasMany('engineer'),
  timeSlice: DS.belongsTo('timeSlice')
});
