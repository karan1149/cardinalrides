Session.set('submitErrors', "")

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
 },
 flightStatus: function() { return (Session.get('direction') === "to") ? "departing" : "landing"},
 errors: function() { return Session.get('submitErrors')}
});
Template.home.events({
  'submit': function(e){
    e.preventDefault();
    var id ="";
    var flight = {direction: e.target.direction.value, airport: e.target.airport.value, part: e.target.part.value, month: e.target.month.value, day: e.target.day.value, time:e.target.time.value, timeModifier: e.target.timeModifier.value, email: e.target.email.value}
    if (isFlight(flight)) {
      Meteor.call('addFlight', flight, function(error, result){
        if (error) return Session.set('submitErrors', "Duplicate flight.");
        Router.go('submitted', {_id: result})
      });
    } else {
      return Session.set('submitErrors', "Some fields were filled out incorrectly. Please check the time and email and try again.")
    }
  }
});
