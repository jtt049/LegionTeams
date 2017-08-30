import Experiment from '../../../universal/models/Experiment';

export default function (Template) {
  Template['createExperiment'].helpers({
  });

  Template['createExperiment'].events({
    'submit .create-experiment'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const name = target.name.value;
      const size = target.teamSize.value;
      const url = target.taskUrl.value;
      

      // Insert a task into the collection
      Experiment.insert({
        name: name,
        teamSize: size,
        taskURL: url,
        
        createdAt: new Date(), // current time
      }, (err, _id) => {
        if (err) {
          console.error(err);
        }

        if (_id) {
          FlowRouter.go('/experiment/' + _id + '/dashboard');
        }
      });

      // Clear form
      target.name.value = '';
      target.teamSize.value = '';
      target.taskUrl.value = '';
     
    },
  });
}
