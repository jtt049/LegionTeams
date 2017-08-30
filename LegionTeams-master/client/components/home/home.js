// TODO: call this in entry file
export default function (Template) {
  Template['home'].helpers({
  });

  Template['home'].events({
    'submit .goto-experiment'(event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      const target = event.target;
      const id = target.experimentId.value;

      FlowRouter.go('/experiment/' + id);
    }
  });
}
