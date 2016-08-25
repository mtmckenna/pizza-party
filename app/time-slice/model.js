import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  teams: DS.hasMany('team', { async: true }),
  engineers: DS.hasMany('engineer', { async: true })
});
