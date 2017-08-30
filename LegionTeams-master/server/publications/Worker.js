// TODO: call this in entry file
import Worker from '../../universal/models/Worker.js';
export default function () {
  Meteor.publish('Worker', function () {
    return Worker.find();
  });
}
