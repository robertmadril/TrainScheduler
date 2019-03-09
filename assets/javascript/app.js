// Initialize Firebase
var config = {
    apiKey: "AIzaSyAsIvHrkeHhmRKfUmJ4M5_Yb0M4U1kj1es",
    authDomain: "rmm-train-schedule.firebaseapp.com",
    databaseURL: "https://rmm-train-schedule.firebaseio.com",
    projectId: "rmm-train-schedule",
    storageBucket: "",
    messagingSenderId: "296416708252"
};
firebase.initializeApp(config);
//hold database value for readability
var database = firebase.database();

$("#submit-btn").on("click", function (event) {
    //prevents refresh
    event.preventDefault();
    //hold input values
    var trainInput = $("#train-input").val().trim();
    var destinationInput = $("#destination-input").val().trim();
    var firstTrainInput = $("#first-train-input").val().trim();
    var frequencyInput = $("#frequency-input").val().trim();
    //var to hold object that will be pushed to db
    var newTrain = {
        name: trainInput,
        destination: destinationInput,
        firstTrain: firstTrainInput,
        frequency: frequencyInput
    }
    //push to firebase database
    database.ref().push(newTrain);
});

database.ref().on("child_added", function (snapshot) {
    //hold object value
    var sv = snapshot.val();
    //direct storing of database vars
    var dbName = sv.name;
    var dbDestination = sv.destination;
    var dbFirstTrain = sv.firstTrain;
    var dbFrequency = sv.frequency;

    //time manipulation
    //convert first train
    var firstTimeConverted = moment(dbFirstTrain, "HH:mm").subtract(1, "years");
    //var holds current time
    var currentTime = moment();
    //difference in time from current time to first train time
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % dbFrequency;
    var tMinutesTillTrain = dbFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainPretty = moment(nextTrain, "X").format("hh:mm A");



    //create row element to append to html page
    var newRow = $("<tr>");

    newRow.append("<td>" + dbName + "</td>");
    newRow.append("<td>" + dbDestination + "</td>");
    newRow.append("<td>" + dbFrequency + "</td>");
    newRow.append("<td>" + nextTrainPretty + "</td>");
    newRow.append("<td>" + tMinutesTillTrain + "</td>");
    //append row to html
    $("#table-display").append(newRow);


}, function (err) {
    //error message if database is not connecting
    console.log("Oh no :(. This is the error: " + err);
});

/*

Edge cases:

no input on all fields.
Incorrect  time input.
Instructions on field input

*/



