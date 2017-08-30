// TODO: call this in entry file
import Experiment from '../../universal/models/Experiment';

export default function () {
  Meteor.publish('Experiment', function () {
    return Experiment.find();
  });
}
