import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
  classNames: ['creator-input-fields']
});
