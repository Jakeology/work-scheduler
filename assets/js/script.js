var getCurrentDayFormat = moment().format("dddd, MMMM Do");
var getScheduleFormat = moment().format("MM-DD-YYYY");

var schedule = {};

var saveSchedule = function (id) {
  var text = $('#' + id + '-desc').val();
  
  schedule[id] = text;
  localStorage.setItem(getScheduleFormat, JSON.stringify(schedule));
};

$("#currentDay").text(getCurrentDayFormat);

$("button").on("click", function () {
  saveSchedule(this.id);
});
