;(function() {
  'use strict';

  angular.module('app.inbox')
    .factory('inboxModel', ['$http', function($http) {

      var inbox = {};

      //get all currently open chat threads for a user
      inbox.getAllFirebaseConvos = function(username, firebaseUrl, cb) {
        var firebaseConnection = new Firebase(firebaseUrl);

          firebaseConnection.on("value", function(snapshot) {

            var allFirebaseConvos = snapshot.val();
            //iterate through convos
            //filter by ones that have your name in them
            var result = {};

            result = _.map(allFirebaseConvos, function(item, index) {
              // return index;
              return {conversation: index, updated: item.updated};
            });
            
            //remove substring username
            var test = {};

            result = _.map(result, function(item) {

              var updatedItem = item.conversation.replace(username, "");
              console.log("item", updatedItem);
              // return {name: updatedItem, updated: item.updated};
              test[updatedItem] = item.updated;

              return updatedItem;

            });

            var mapping = [test, result];

            if (cb) {
              cb(mapping);
            }            
          }, function (errorObject) {
            console.log("Cannot connect to Firebase: " + errorObject.code);
          });
      }

      return inbox;
    }]);
    
})();
