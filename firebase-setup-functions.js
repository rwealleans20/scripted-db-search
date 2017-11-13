/* global firebase */

/**
 * Initializes the Firebase application.
 */
function initializeFirebase() {
  var config = {
    apiKey: "AIzaSyBtrRNrWZNZrRfAXJYaSeZ1nkgxxOrp2ks",
    authDomain: "scripted-org.firebaseapp.com",
    databaseURL: "https://scripted-org.firebaseio.com",
    projectId: "scripted-org",
    storageBucket: "scripted-org.appspot.com",
    messagingSenderId: "436190267084"
  };

  // YOU FOUND ME! YAAAYYYYYYYY!
  // TODO: Uncomment the following line to fix Firebase initialization.
  
  firebase.initializeApp(config);
}


/**
 * Returns true if any Firebase application is initialized.
 */
function isFirebaseInitialized() {
  return firebase.apps.length > 0;
}


/**
 * Loops through each test case in the Firebase database. For each test case,
 * it calls 'handleTestCase' with 4 arguments:
 *   testId: the HTML ID to use this single test case
 *   testName: the short name to show in the test list
 *   testHint: the longer description to add to the expanded test list view
 *   testFunction: returns true if the test passes, false if it fails
 */
function forEachTestCase(handleTestCase) {
  if (!isFirebaseInitialized()) {
    return; // Don't do anything if the app is not initialized...
  }
  
  var database = firebase.database();
  var testCasesDatabase = database.ref('/db-search/test-cases');
  testCasesDatabase.once('value').then(function(snapshot) {
    var testCases = snapshot.val();
    for (var i = 0; i < testCases.length; i++) {
      var testId = "number-" + i;
      var testName = testCases[i]["test-name"];
      var testHint = testCases[i]["test-hint"];
      var testFunctionName = testCases[i]["test-function"];
      var testAnswer = testCases[i]["test-answer"];
      
      var testFunction = function(handleTestResult) {
        // Look up the global function. Hint: it's just a string key in the
        // 'window' object available in every HTML document.
        if (testFunctionName in window) {
          // Necessary for closure. If you're reading this, great job! If you
          // want to learn more about this, ask one of your teachers or read:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
          var globalTestAnswer = testAnswer;
          var globalTestFunction = window[testFunctionName];
          globalTestFunction(function(value) {
            handleTestResult(value === globalTestAnswer, value);
          });
        } else {
          handleTestResult(false, testFunctionName + " not defined!");
        }
      };
      
      handleTestCase(testId, testName, testHint, testFunction);
    }
  });
}