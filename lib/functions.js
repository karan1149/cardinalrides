Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

isFlight = function(flight) {
  if ((flight.direction === "to" || flight.direction === "from") && (flight.airport === "SFO" || flight.airport === "SJC" || flight.airport === "OAK") && (flight.part === "east" || flight.part === "west") && (!isNaN(getTime(flight)) && (flight.email.substring(flight.email.length-13)==="@stanford.edu")))
    return true;
}
// method run on client to validate data and on server to get correct time from unorganized String
getTime = function(flight){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var pacificTimezone = date.dst() ? "-0700" : "-0800";
  var time = (flight.timeModifier === "pm" && Number.parseInt(flight.time.substring(0,flight.time.indexOf(':'))) != 12 ? (Number.parseInt(flight.time.substring(0,flight.time.indexOf(':'))) + 12) + flight.time.substring(flight.time.length - 3) : flight.time); // 12:00 pm does not need to be adjusted
  if (flight.month==="January" && (month === 11 || month === 10)) year = year + 1; // for new years flights
  return Date.parse(flight.month + " " + flight.day + ", " + year+ " " + time + ":00"+ " " + pacificTimezone);
}
