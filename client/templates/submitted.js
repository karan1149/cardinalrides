Template.submitted.helpers({
  antiDirection: function(){
    return (this.direction === "to") ? "from" : "to";
  },
  soon: function() {
    var date = new Date();
    return (this.time.getTime() - date.getTime() < 1000 * 3600 * 13);
  },
  pacificTime: function() {
    var difference = getPacificOffset()*60 - this.time.getTimezoneOffset()*-1;
    var newDate = new Date(this.time.getTime() + difference*60*1000);
    return newDate.toString().substring(0,16) + getFormattedTime(newDate.toString().substring(16,21));
  }
});
