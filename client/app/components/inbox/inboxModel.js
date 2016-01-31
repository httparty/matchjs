;(function() {
  'use strict';

  angular.module('app.inbox')
    .factory('inboxModel', [ function() {
      var inbox = {};

      inbox.getAllFirebaseConvos = function(username, firebaseUrl, callback) {

        var firebaseConnection = new Firebase(firebaseUrl);

          //list of all users the current user has had
          //a conversation with
          var userConversationHistory = {};

          //a mapping between conversation name
          //and time last updated
          var comparator = {};

          firebaseConnection.on("value", function(snapshot) {

            //get all Firebase user conversations 
            var allFirebaseConvos = snapshot.val();

            //Format data from Firebase
            userConversationHistory = _.map(allFirebaseConvos, function(item, index) {
              return {conversation: index, updated: item.updated};
            });

            //Remove current user name from conversation name
            //in order to properly format
            //Get timestamps for comparator mapping
            userConversationHistory = _.map(userConversationHistory, function(item) {
              var updatedItem = item.conversation.replace(username, "");
              comparator[updatedItem] = item.updated;
              return updatedItem;
            });

            var mapping = [comparator, userConversationHistory];

            if (callback) {
              callback(mapping);
            }            
          }, function (errorObject) {
            console.log("Cannot connect to Firebase: " + errorObject.code);
          });
      }

      return inbox;
    }]);
    
})();