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
      return Flights.findOne(params._id);
    }
  }
};
Templates.matches = {
  path: 'matches.html',
  helpers: {
    preview() {return "View your matches!"},
    areOthers() { return this.other.length > 0},
    getLeeway() {return leeway},
    antiDirection() {return this.matched.direction === "to" ? "from" : "to"},
    pacificTime: function() {
      var difference = getPacificOffset()*60 - this.matched.time.getTimezoneOffset()*-1;
      var newDate = new Date(this.matched.time.getTime() + difference*60*1000);
      return newDate.toString().substring(0,16) + getFormattedTime(newDate.toString().substring(16,21));
    },
    pacificTimeDirect: function() {
      var difference = getPacificOffset()*60 - this.time.getTimezoneOffset()*-1;
      var newDate = new Date(this.time.getTime() + difference*60*1000);
      return newDate.toString().substring(0,16) + getFormattedTime(newDate.toString().substring(16,21));
    }
  } ,
  route: {
    path: '/matches/:_id/:_id2/:_id3',
    data: function(params) {
      return {matched: Flights.findOne(params._id), other: [Flights.findOne(params._id2), Flights.findOne(params._id3)]};
    }
  }
};
