/* global firebase */

function getVersion(handleVersion) {
  var database = firebase.database();
  var databaseVersionReference = database.ref('/db-search/version');
  databaseVersionReference.once('value').then(function(snapshot) {
    
    // You found me! Great job!
    // TODO: Uncomment the code below. It gets the current version value from
    // the database snapshot and passes it as an argument to the 'handleVersion'
    // callback.
    
    //var version = snapshot.val();
    //handleVersion(version);
  });
}

function getHelloWorldValue(handleType) {
  // TODO: Your code goes here. Hint: use 'getVersion' as a template.
}

function applyDiscount(handleNewPrice) {
  // TODO: Your code goes here.
}

function getArrayLength(handleLength) {
  // TODO: Your code goes here.
}

function getLastArrayElement(handleElement) {
  // TODO: Your code goes here.
}

function getArrayJoin(handleJoin) {
  // TODO: Your code goes here.
}

function getNumberOrStringType(handleType) {
  // TODO: Your code goes here.
}

function getObjectValue(handleValue) {
  // TODO: Your code goes here.
}

function getObjectKeyCount(handleKeyCount) {
  // TODO: Your code goes here.
}