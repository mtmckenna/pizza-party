import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('team-creator', 'Integration | Component | team creator', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{team-creator}}`);

  assert.equal(this.$().text().trim(), 'Add team');
});
