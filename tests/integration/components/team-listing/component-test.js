import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('team-listing', 'Integration | Component | team listing', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('team', {name: 'Bulls'});
  this.render(hbs`{{team-listing team=team}}`);

  assert.equal(this.$().text().trim().indexOf('Bulls') > -1, true);
});
