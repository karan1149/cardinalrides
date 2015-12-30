leeway = 3;

Meteor.setInterval(function(){
  date = new Date();
  var upcomingFlights = _.filter(Flights.find({matched : {$ne: true}}).fetch(), function(flight){
    return flight.time.getTime() < date.getTime() + 12*1000*3600;
  });
  for (i=0; i<upcomingFlights.length; i++) {
    flight = upcomingFlights[i];
    var otherFlights = _.reject(Flights.find().fetch(), function(element) { return flight === element});
    otherFlights = _.filter(otherFlights, function(element) { return Math.abs(flight.time.getTime() - element.time.getTime()) < 1000*3600*leeway });
    Flights.update(flight._id, {$set: {matched:true}});
    otherFlights = _.sortBy(otherFlights, function(otherFlight) {
      return Math.abs(otherFlight.time.getTime()-flight.time.getTime())
    });
    Mailer.send({
      to: flight.email,
      subject: "Cardinal Rides Matches for Your " + flight.time.toString().substring(0,3) + ". Flight",
      template: 'matches',
      data: {matched: flight, other: otherFlights}
    });
  }
}, 1000*1*3600);