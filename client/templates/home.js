Template.home.helpers({
  revealAfterAirport: function() { return ($('[name="direction"]').val() === "--" || $('[name="airport"]').val() === "--" ? "hide" : "")}
});
