import Worker from '../../../universal/models/Worker.js';
import Event from '../../../universal/models/Event.js';
import Experiment from '../../../universal/models/Experiment.js';
import constants from '../../../universal/config.js';

export default function (Template) {
  Template.experimentLogin.events({
    'submit .login-worker'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const source = target.source.value;
      const id = target.sourceId.value;

      // Insert a task into the collection
      Worker.insert({
        source: source,
        id: id,
        createdAt: new Date(), // current time
        experiment: FlowRouter.getParam('experimentId')
      }, (err, _id) => {
        if (err) {
          console.error(err);
        }

        // Record login
        Event.insert({
          action: 'logged_in',
          worker: _id,
          experiment: FlowRouter.getParam('experimentId'),
          timestamp: new Date()
        });

        Session.set('currentWorkerId', _id);
        FlowRouter.go('/experiment/' + FlowRouter.getParam('experimentId') + '/queue');
      });

      // Clear form
      target.source.value = '';
      target.sourceId.value = '';
    },
  });

  Template.experimentLogin.helpers({
    taskDuration: () => {
      return constants.waitDuration;
    }
  });

  Template.experimentLogin.rendered = function () {
  };
}
