Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound'
});
Router.route('/', {name: 'home'});
Router.route('/submitted/:_id', {name:'submitted', data: function(){
  return Flights.findOne(this.params._id);
}, waitOn: function() {
  return Meteor.subscribe("flight", this.params._id);
}})
