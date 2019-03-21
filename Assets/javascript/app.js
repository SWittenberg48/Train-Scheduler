// Initialize Firebase
$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyDOTzs3kBFy1pTZpUxvNfHYUxvhQKQPpKE",
    authDomain: "train-schedule-project-9b59e.firebaseapp.com",
    databaseURL: "https://train-schedule-project-9b59e.firebaseio.com",
    projectId: "train-schedule-project-9b59e",
    storageBucket: "train-schedule-project-9b59e.appspot.com",
    messagingSenderId: "479468948190"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var trainTime = "";
  var frequency = "";

  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    trainName = $("#name")
      .val()
      .trim();

    destination = $("#destination")
      .val()
      .trim();

    trainTime = $("#firstTime")
      .val()
      .trim();

    frequency = $("#frequency")
      .val()
      .trim();

    database.ref().push({
      train: trainName,
      destination: destination,
      time: trainTime,
      frequency: frequency
    });
  });
  database.ref().on("child_added", function(snapshot) {
    var trainData = snapshot.val().train;
    var destData = snapshot.val().destination;
    var firstData = snapshot.val().time;
    var frequencyData = snapshot.val().frequency;

    var firstTrainConverted = moment(firstData, "hh:mm").subtract("1, years");
    var currentTime = moment().format("hh:mm");
    var difference = moment().diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % frequencyData;
    var minUntilTrain = frequencyData - remainder;
    console.log(remainder);
    var nextTrain = moment()
      .add(minUntilTrain, "minutes")
      .format("hh:mm");

    // This is where I am getting my error and can not for the life of me find it.Phantom?
    // Trying to append same way I did previously in an assignment for Job data. Says > should not be there.

    $("#final-append").append(
      `<tr>
        <td>${trainData}</td>
      <td>${destData}</td>
      <td>${frequencyData}</td>
      <td>${moment(nextTrain).format("hh:mm")}</td>
      <td>${minUntilTrain}</td>
      </tr>`
    );
  });
});
