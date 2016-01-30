import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('engineer-listing', 'Integration | Component | engineer listing', {
  integration: true
});

test('it renders', function(assert) {
  this.set('engineer', { name: 'Zevon' });

  this.render(hbs`{{engineer-listing engineer=engineer}}`);

  assert.equal(this.$().text().trim(), 'x Zevon');
});
