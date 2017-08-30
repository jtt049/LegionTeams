import Worker from '../../../universal/models/Worker.js';
import Experiment from '../../../universal/models/Experiment.js';

Meteor.subscribe('Worker');
Meteor.subscribe('Experiment');

export default function (Template) {

  Template['dashboard'].helpers({
    workers: () => {
      return Worker.find({ experiment: FlowRouter.getParam('experimentId') });
    },

    experiment: () => {
      return Experiment.findOne(FlowRouter.getParam('experimentId'));
    },

    graphStyles: () => {
      //Will create an exception at first since Experiment hasn't loaded
      let threshhold = Experiment.findOne(FlowRouter.getParam('experimentId')).teamSize;
      let offset = Worker.find({ experiment: FlowRouter.getParam('experimentId') }).count() * 300 / threshhold;
      return "bottom: " + parseInt(offset) + "px";
    }
  });

  Template['dashboard'].onRendered(function () {
    // TODO: Very bad, refactor (rewrite) when time permits
    Meteor.setTimeout(function () {
      if (parseInt(Experiment.find({}).count()) < 1) {
        Experiment.insert({
          name: "Experiment #1",
          createdAt: new Date() // current time
        }, (err, _id) => {
          if (err) {
            console.error(err);
          }
        });
      }
      ;
    }, 1000);
  });

  Template['dashboard'].events({
    'click .dashboard-launch-btn' (event) {
      Meteor.call('launchAllWorkers',
        FlowRouter.getParam('experimentId'),
        (err, res) => {
          if (err) {
            alert(err);
          } else {
            alert('All workers launched!');
          }
        });
    },

    'submit .settings-form' (event) {
      // Prevent default browser form submit
      event.preventDefault();
      let currentExperiment = Experiment.findOne(FlowRouter.getParam('experimentId'));

      // Get value from form element
      const target = event.target;

      const name = target.name.value ? target.name.value : currentExperiment.name;
      const teamSize = target.teamSize.value ? target.teamSize.value : currentExperiment.teamSize;
      const taskURL = target.taskURL.value ? target.taskURL.value : currentExperiment.taskURL;
     
      Experiment.update(
        { _id: currentExperiment._id },
        {
          $set: {
            name: name,
            teamSize: teamSize,
            taskURL: taskURL,
            
          }
        }
      );

      // Clear form
      document.getElementById('settings').style.display = "none";
    },

    'click #settings' (event) {
      if (event.target == document.getElementById('settings')) {
        document.getElementById('settings').style.display = "none";
      }
    },

    'click .dashboard-settings-btn' (event) {
      document.getElementById('settings').style.display = "block";
    },

  });
}
