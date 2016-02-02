import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('engineer-creator', 'Integration | Component | engineer creator', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.set('createEngineer', function() {});
  this.render(hbs`{{engineer-creator createEngineer=createEngineer}}`);

  assert.equal(this.$().text().trim(), 'Add engineer');
});
