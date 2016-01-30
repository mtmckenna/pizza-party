import Ember from 'ember';
import FirebaseAdapter from 'emberfire/adapters/firebase';
import DS from 'ember-data';
import config from '../config/environment';

const { inject } = Ember;

var adapter = FirebaseAdapter.extend({
  firebase: inject.service(),
});

if (config.environment === 'test') {
  adapter = DS.JSONAPIAdapter.extend({});
}

export default adapter;
