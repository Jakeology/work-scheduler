var getCurrentDayFormat = moment().format("dddd, MMMM Do");
var getScheduleFormat = moment().format("MM-DD-YYYY");

var schedule;

var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem(getScheduleFormat));

  if (!schedule) {
    schedule = {};
  }

  $.each(schedule, function (key, val) {
    //console.log(key, val);
    $('#' + key + '-desc').val(val);
  });
};

var saveSchedule = function (id) {
  var text = $('#' + id + '-desc').val();

  schedule[id] = text;
  localStorage.setItem(getScheduleFormat, JSON.stringify(schedule));
};

$("#currentDay").text(getCurrentDayFormat);

$("button").on("click", function () {
  saveSchedule(this.id);
});

loadSchedule();