import Worker from './Worker';
import Experiment from './Experiment';

const Event = new Mongo.Collection('Event');

Event.attachSchema(
    new SimpleSchema({
    action: {
      type: String
    },
    worker: {
      type: Worker
    },
    experiment: {
      type: Experiment
    },
    timestamp: {
      type: Date,
      denyUpdate: true
    }
  })
);

// Collection2 already does schema checking
if (Meteor.isServer) {
  Event.allow({
    insert : () => true,
    update : () => false,
    remove : () => false
  });
}

export default Event;
