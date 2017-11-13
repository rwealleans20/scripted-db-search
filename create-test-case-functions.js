/* global $ */

/**
 * Returns a single <a> HTML element that represents one test case as a red
 * collapsable list item. It turns green if the given 'testFunction' returns
 * true.
 * 
 * Parameters:
 *   testId: The HTML ID to use for the element
 *   testName: The short test name to show in the list item
 *   testHint: The long description to show in the expanded list item
 *   testFunction: A function that returns true if the test passes, false if the
 *       test fails.
 */
function createTestCase(testId, testName, testHint, testFunction) {
  // Constructs the following HTML using jQuery:
  //
  //<a data-toggle="collapse"
  //    href="#test-case-initialize"
  //    class="list-group-item list-group-item-action list-group-item-danger">
  //   <span>Initialize Firebase Application</span>
  //   <div class="collapse text-muted" id="test-case-initialize">
  //     Find and fix the 'initializeFirebase()' function
  //   </div>
  // </a>
  var testCaseId = "test-case-" + testId;
  var testContainer = $("<a>", {
    "href": "#" + testCaseId,
    "data-toggle": "collapse",
    "class": "list-group-item list-group-item-action list-group-item-danger " +
        "justify-content-between",
  });
  var testNameSpan = $("<span>", {
    "text": testName,
  });
  var testHintDiv = $("<div>", {
    "id": testCaseId,
    "class": "collapse text-muted",
    "text": testHint,
  });
  var testValueBadge = $("<span>", {
    "class": "badge invisible",
    "text": "Error!"
  })

  testFunction(function (testPassed, testValue) {
    // Should the test be red or green?
    if (testPassed) {
      testContainer.removeClass("list-group-item-danger"); // Remove red.
      testContainer.addClass("list-group-item-success"); // Add green.
    }
    
    // Show the test result value in a little "badge" on the right side.
    testValueBadge.removeClass("invisible");
    if (testValue) {
      testValueBadge.text(testValue);
    }
  });

  testContainer.append(testNameSpan, testValueBadge, testHintDiv);
  return testContainer;
}


/**
 * Returns the initial test case that only checks if the Firebase application
 * has be initialized.
 * 
 * Parameters:
 *   isFirebaseInitialized: returns true if any Firebase application is set up
 */
function createInitialTestCase(isFirebaseInitialized) {
  var testId = "initial";
  var testName = "Initialize Firebase Application";
  var testHint =
    "Find and fix the 'initializeFirebase()' function, which may be in a " +
    "different file. Once you find the solution, this page will fetch all of " +
    "the remaining tasks from the Firebase database and populate this page.";
  return createTestCase(testId, testName, testHint, function(handleTestResult) {
    var testPassed = isFirebaseInitialized();
    return handleTestResult(testPassed, testPassed ? "True" : "False");
  });
}