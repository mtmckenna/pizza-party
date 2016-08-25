import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  name: validator('presence', true)
});

export default Ember.Component.extend(Validations, {
  classNames: ['creator-input-fields'],

  actions: {
    save: function() {
      var teamName = this.get('name');
      var timeSlice = this.get('timeSlice');

      this.get('createTeam')(teamName, timeSlice).then(() => {
        this.set('name', '');
      });
    }
  }
});
