import Experiment from '../../../universal/models/Experiment.js';

export default function (Template) {
  Template['requester'].helpers({
    experiments: function() {
      return Experiment.find({});
    }
  });

  Template['requester'].events({
  });
}
