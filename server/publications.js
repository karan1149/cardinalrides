Meteor.publish('flight', function(id){
  check(id, String);
  return Flights.find({_id:id});
});
