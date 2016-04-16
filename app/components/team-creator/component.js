import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
  classNames: ['creator-input-fields'],

  actions: {
    save: function(name) {
      this.get('createTeam')(name).then(() => {
        this.set('name', '');
      });
    }
  }
});
