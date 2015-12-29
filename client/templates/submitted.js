Template.submitted.helpers({
  antiDirection: function(){
    return (this.direction === "to") ? "from" : "to";
  },
  soon: function() {
    var date = new Date();
    return (this.time.getTime() - date.getTime() < 1000 * 3600 * 13);
  }
});
