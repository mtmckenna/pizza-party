import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('engineer-listing', 'Integration | Component | engineer listing', {
  integration: true
});

test('it renders', function(assert) {
  this.set('engineer', { name: 'Zevon' });
  this.set('deleteEngineer', function() {});

  this.render(hbs`{{engineer-listing engineer=engineer deleteEngineer=deleteEngineer}}`);

  assert.equal(this.$().text().trim().indexOf('Zevon') > -1, true);
});
