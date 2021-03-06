FastRenderColl = new Mongo.Collection('fast-render-coll');

FlowRouter.route('/the-fast-render-route', {
  subscriptions: function() {
    this.register('data', Meteor.subscribe('fast-render-data'));
  }
});

FlowRouter.route('/no-fast-render', {
  subscriptions: function() {
    if(Meteor.isClient) {
      this.register('data', Meteor.subscribe('fast-render-data'));
    }
  }
});

if(Meteor.isServer) {
  if(!FastRenderColl.findOne()) {
    FastRenderColl.insert({_id: "one", aa: 10});
    FastRenderColl.insert({_id: "two", aa: 20});
  }

  Meteor.publish('fast-render-data', function() {
    return FastRenderColl.find({}, {sort: {aa: -1}});
  });
}