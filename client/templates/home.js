/**
airport = null;
direction = null;
  Meteor.setInterval(function(){
    airport = new ReactiveVar();
    direction = new ReactiveVar();
    airport.set($('[name="airport"]').val());
    direction.set($('[name="direction"]').val());
  //   if (airport === "--" || direction === "--") self.$('.reveal').hide();
}, 750)
**/

Session.set('airports', '--');
Session.set('direction', '--');

Meteor.setInterval(function(){
  Session.set('airport',$('[name="airport"]').val())
  Session.set('direction', $('[name="direction"]').val())
}, 500);


Template.home.helpers({
 revealAfterAirport: function() { return (Session.get('airport') === "--" || Session.get('direction') === "--")? "hide" : ""},
 antiDirection: function() {
   return (Session.get('direction') === "to") ? "from" : "to";
 }
});
