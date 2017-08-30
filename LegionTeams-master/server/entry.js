import setupBrowserPolicy from './config/security.js';
import loadFixtures from './loaders/fixtures.js';
import loadUsers from './loaders/users.js';
import Worker from './publications/Worker';
import Experiment from './publications/Experiment';
import loadMethods from './methods/workerMethods';

setupBrowserPolicy(BrowserPolicy);

Meteor.startup(() => {
  loadUsers();
  Worker();
  Experiment();
  loadMethods();
  //loadFixtures([{ foo: 'bar' }], myCollection);
});
