Flights = new Mongo.Collection('flights');
Meteor.methods({
  addFlight: function(flight){
    check(flight, {direction: String, airport: String, part: String, month: String, day: String, time: String, timeModifier: String, email: String})
    if (isFlight(flight))  {
      Meteor.call('sendVerification', flight)
      return Flights.insert({direction:flight.direction, airport: flight.airport, part:flight.part, email: flight.email, time: new Date(getTime(flight))});
    }
    else { throw new Meteor.Error('invalid', 'Invalid flight.')}
  },
  sendVerification: function(flight){

  }
});
