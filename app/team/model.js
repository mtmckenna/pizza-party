import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  engineers: DS.hasMany('engineer', { async: true })
});
