import Worker from '../../universal/models/Worker.js';
import Event from '../../universal/models/Event.js';
import { check } from 'meteor/check';

export default function () {
  Meteor.methods({
    'launchAllWorkers'(experimentId) {
      // TODO: Check if experiment ID exists
      check(experimentId, String);

      Worker.update({ status: 'waiting', experiment: experimentId }, { $set: { status: 'confirm' } }, { multi: true });
      // TODO: Very bad, refactor (rewrite) when time permits
      let query = Worker.find({ status: 'confirm', experiment: experimentId });

      let count = query.count();

      query.forEach(function (worker) {
        // Record event
        Event.insert({
          action: 'confirmationRequested',
          worker: worker._id,
          experiment: worker.experiment,
          timestamp: new Date()
        });
      });

      var handle = query.observeChanges({
        removed: function (id) {
          count--;

          if (count == 0) {

            const confirmed = Worker.find({ status: 'confirmed' });

            confirmed.forEach(function (worker) {
              // Record event
              Event.insert({
                action: 'launched',
                worker: worker._id,
                experiment: worker.experiment,
                timestamp: new Date()
              });
            });

            Worker.update({ status: 'confirmed' }, {
                $set: {
                  launchTime: new Date(),
                  status: 'launch'
                }
              },
              { multi: true }
            );

            handle.stop();
          }
        }
      });
    }
  });
}
