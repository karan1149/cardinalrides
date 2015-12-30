Flights = new Mongo.Collection('flights');
if(Meteor.isServer){
  Meteor.methods({
    addFlight: function(flight){
      check(flight, {direction: String, airport: String, part: String, month: String, day: String, time: String, timeModifier: String, email: String});
      if (isFlight(flight))  {
        var time = getTime(flight);
        flight.time = new Date(time);
        Meteor.call('sendVerification', flight)
        return Flights.insert(flight);
      }
      else { throw new Meteor.Error('invalid', 'Invalid flight.')}
    },
    sendVerification: function(flight){
      check(flight, {direction: String, airport: String, part: String, month: String, day: String, time: Date, timeModifier: String, email: String});
      Mailer.send({
        to: flight.email,
        subject: 'Cardinal Rides Confirmation',
        template: 'confirmation',
        data: flight
      });
    }
  }) ;
}
