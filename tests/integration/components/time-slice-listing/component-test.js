import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('time-slice-listing', 'Integration | Component | time slice listing', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('timeSlice', {name: 'pizza'});
  this.render(hbs`{{time-slice-listing timeSlice=timeSlice}}`);

  assert.equal(this.$().text().trim(), '');
});
