const Experiment = new Mongo.Collection('Experiment');

Experiment.attachSchema(
    new SimpleSchema({
    name: {
      type: String
    },
    // createdBy: {
    //   type: String,
    //   autoValue: function(){ return this.userId }
    // },
    createdAt: {
      type: Date,
      denyUpdate: true
    },
    teamSize: {
      type: Number,
      defaultValue: 15
    },
    taskURL: {
      type: String,
      defaultValue: 'https://ucsdsocialsciences.co1.qualtrics.com/jfe/form/SV_ePdSR61JblJnyGp?workerID=ABC123'
    },
    altURL: {
      type: String,
      defaultValue: 'https://ucsdsocialsciences.co1.qualtrics.com/jfe/form/SV_aY96eIvcFAMxI4R'
    },
    queueTask: {
       type: String,
       defaultValue: "Tetris"
    }
  })
);

// Collection2 already does schema checking
if (Meteor.isServer) {
  Experiment.allow({
    insert : () => true,
    update : () => true,
    remove : () => true
  });
}

//Experiment.rawCollection().drop();


export default Experiment;
