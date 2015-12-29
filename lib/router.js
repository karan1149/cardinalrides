Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  notFoundTemplate: 'notFound'
});
Router.route('/', {name: 'home'});
