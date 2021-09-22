var getCurrentDayFormat = moment().format("dddd, MMMM Do");
var getScheduleFormat = moment().format("MM-DD-YYYY");

var schedule = {};

var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem(getScheduleFormat));

  if (!schedule) {
    schedule = {};
  }

  $.each(schedule, function (key, val) {
    $("#" + key + "-desc").val(val);
  });

  auditSchedule();
};

var auditSchedule = function () {
  $(".hour").each(function (i, obj) {
    var timeBlock = obj.textContent;
    var convetTimeBlock = moment(timeBlock, "hA");
    var id = convertNumberToId(parseInt(timeBlock));

    if (moment().isAfter(convetTimeBlock.add(1, "hour"))) {
      $("#" + id + "-desc").addClass("list-group-item-dark");
    } else if (moment().isBefore(convetTimeBlock.subtract(1, "hour"))) {
      $("#" + id + "-desc").addClass("list-group-item-success");
    } else {
      $("#" + id + "-desc").addClass("list-group-item-info");
    }
  });

  //auditLocalStorage();

};

var auditLocalStorage = function() {
  var keys = Object.keys(localStorage);
  for(var i=0; i < keys.length; i++){
    var keyDate = keys[i];
    var convertKeyDate = moment(keyDate, "MM-DD-YYYY");

    if(!moment().isSame(convertKeyDate, 'day')) {
      localStorage.removeItem(keyDate);
      location.reload();
    }
  }
}

var convertNumberToId = function (number) {
  var numberNames = [
    "",
    "onePM",
    "twoPM",
    "threePM",
    "fourPM",
    "fivePM",
    "",
    "",
    "",
    "nineAM",
    "tenAM",
    "elevenAM",
    "twelvePM",
  ];
  return numberNames[number];
};

var saveSchedule = function (id) {
  var text = $("#" + id + "-desc").val();

  schedule[id] = text;

  if (!text) {
    if (id in schedule) {
      delete schedule[id];
    }
  }

  localStorage.setItem(getScheduleFormat, JSON.stringify(schedule));
};

$("#currentDay").text(getCurrentDayFormat);

$("button").on("click", function () {
  saveSchedule(this.id);
});

loadSchedule();

//Runs every 30 minutes to update the schedule audit.
//TODO change back to 30 fom 5
setInterval(function () {
  auditSchedule();
  auditLocalStorage();
}, 1000 * 60 * 30);
