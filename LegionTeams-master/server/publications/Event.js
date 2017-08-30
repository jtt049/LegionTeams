// TODO: call this in entry file
import Event from '../../universal/models/Event';

export default function () {
  Meteor.publish('Event', function () {
    return Event.find();
  });
}
