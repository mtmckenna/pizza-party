import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('team-listing', 'Integration | Component | team listing', {
  integration: true
});

test('it renders', function(assert) {
  this.set('team', {name: 'Bulls'});
  this.set('deleteEngineer', function() {});
  this.set('moveEngineer', function() {});
  this.set('deleteTeam', function() {});
  this.set('moveTeam', function() {});

  this.render(hbs`{{team-listing team=team deleteEngineer=deleteEngineer moveEngineer=moveEngineer deleteTeam=deleteTeam moveTeam=moveTeam}}`);

  assert.equal(this.$().text().trim().indexOf('Bulls') > -1, true);
});
