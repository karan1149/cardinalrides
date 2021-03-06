Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
}

Date.prototype.dst = function() {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
}

getPacificOffset = function() {
  date = new Date();
  return date.dst() ? -7 : -8;
}

getFormattedTime = function (fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2));
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(3);

    return hours + ':' + minutes + " " + amPm;
};

isFlight = function(flight) {
  var date = new Date();
  if ((flight.direction === "to" || flight.direction === "from") && (flight.airport === "SFO" || flight.airport === "SJC" || flight.airport === "OAK") && (flight.part === "east" || flight.part === "west") && (!isNaN(getTime(flight))) && (flight.email.substring(flight.email.length-13)==="@stanford.edu") && (getTime(flight)> date.getTime()+1000*3600))
    return true;
  return false;
}
// method run on client to validate data and on server to get correct time from unorganized String
getTime = function(flight){
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var negativePacificTimezone = date.dst() ? "-0700" : "-0800";
  var time = (flight.timeModifier === "pm" && parseInt(flight.time.substring(0,flight.time.indexOf(':'))) != 12 ? (parseInt(flight.time.substring(0,flight.time.indexOf(':'))) + 12) + flight.time.substring(flight.time.length - 3) : flight.time); // 12:00 pm does not need to be adjusted, 12 am does
  time = (flight.timeModifier === "am" && flight.time.substring(0,2) === "12") ? ("00" + flight.time.substring(flight.time.length - 3)): time;
  if (flight.month==="January" && (month === 11 || month === 10)) year = year + 1; // for new years flights
  return Date.parse(flight.month + " " + flight.day + ", " + year+ " " + time + ":00"+ " " + negativePacificTimezone);
}
