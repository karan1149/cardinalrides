Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('notifications')]; }
});
Router.route('/', {name: 'home'});
