Flights = new Mongo.Collection('flights');
Meteor.publish({
  flight: function(_id) {
    return Posts.findOne(_id);
  }
});
Meteor.methods({
  addFlight: function(flight){
    check(flight, {direction: String, airport: String, part: String, month: String, day: Number, time: String, timeModifier: String, email: String})
    if (isFlight(flight))  {
      return Flights.insert({direction:flight.direction, airport: flight.airport, part:flight.part, email: flight.email, time: new Date(getTime(flight))});
    }
    else { throw new Meteor.Error('invalid', 'Invalid flight.')}
  }
});
