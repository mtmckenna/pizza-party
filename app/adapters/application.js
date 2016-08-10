import FirebaseAdapter from 'emberfire/adapters/firebase';
import DS from 'ember-data';
import config from '../config/environment';

var adapter = FirebaseAdapter.extend({});

if (config.environment === 'test') {
  adapter = DS.JSONAPIAdapter.extend({});
}

export default adapter;
