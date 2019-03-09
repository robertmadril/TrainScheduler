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

  var database = firebase.database();

  console.log("Work")

  $("#submit-btn").on("click", function(event) {
      event.preventDefault();

      var trainInput = $("#train-input").val().trim();
      var destinationInput = $("#destination-input").val().trim();
      var firstTrainInput = $("#first-train-input").val().trim();
      var frequencyInput = $("#frequency-input").val().trim();

      console.log(trainInput)

      var newTrain = {
          name: trainInput,
          destination: destinationInput,
          firstTrain: firstTrainInput,
          frequency: frequencyInput
      }

      database.ref().push(newTrain);
  });

  database.ref().on("child_added", function(snapshot){

    var sv = snapshot.val();

    var dbName = sv.name;
    var dbDestination = sv.destination;
    var dbFirstTrain = sv.firstTrain;
    var dbFrequency = sv.frequency;

    

  }, function(err){

  })



