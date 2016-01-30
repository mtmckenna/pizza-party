import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  name: function(i) { return 'Bulls' + i; },
  id: function(i) { return 'TeamId' + i; }
});
