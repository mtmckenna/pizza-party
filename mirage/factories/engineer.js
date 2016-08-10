import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function(i) { return 'Zevon' + i; },
  id: function(i) { return 'EngineerId' + i; }
});
