Templates = {};

Templates.confirmation = {
  path: 'confirmation.html',
  helpers: {
    preview() {
      return "We're currently looking for matches!";
    },
    antiDirection() { return this.direction === "to" ? "from" : "to"},
    pacificTime: function() {
      var difference = getPacificOffset()*60 - this.time.getTimezoneOffset()*-1;
      var newDate = new Date(this.time.getTime() + difference*60*1000);
      return newDate.toString().substring(0,16) + getFormattedTime(newDate.toString().substring(16,21));
    },
    soon: function() {
      var date = new Date();
      return (this.time.getTime() - date.getTime() < 1000 * 3600 * 13);
    },
  },
  route: {
    path: '/confirmation/:_id',
    data: function(params) { // return object, not cursor
      console.log(Flights.find().fetch());
      return Flights.findOne(params._id);
    }
  }
};
Templates.matches = {
  path: 'matches.html',
  helpers: {
    preview() {return "We've found some matches!"}
  }
};
