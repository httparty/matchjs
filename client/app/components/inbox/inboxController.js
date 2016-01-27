;(function() {
  'use strict';

  angular.module('app.inbox', ['firebase'])
    .controller('InboxController', ['$scope', '$firebaseArray', 'AuthService', 'connectModel', function($scope, $firebaseArray, AuthService, connectModel) {

      //Firebase
      var baseURL = 'https://matchjs.firebaseio.com/chat/';
      var firebaseConnection = '';

      var currentUser = angular.fromJson(AuthService.getCurrentUser());
      $scope.username = currentUser.username;
      $scope.conversationList = [];

      //Person with whom you are currently chatting
      $scope.currentRecipient = '';
      $scope.currentMessageList = [];
      $scope.enteredText = '';

      $scope.getAllUsers = function() {

        connectModel.getAllUsers().then(function(r) {
          $scope.conversationList = r.data;
        });
      };

      $scope.displayMessages = function() {
        
        $scope.currentMessageList = $firebaseArray(firebaseConnection.child('messages'));
      };

      $scope.sendMessage = function() {

        $scope.currentMessageList.$add({message : $scope.enteredText, to: $scope.currentRecipient, from: $scope.username});
        $scope.enteredText = '';
      };

      $scope.switchConversation = function(conversation) {

        $scope.currentRecipient = conversation.username;
        $scope.currentRecipientName = conversation.name;
        var arr = [$scope.currentRecipient, $scope.username].sort();
        var convoURL = baseURL + arr[0] + arr[1];
        firebaseConnection = new Firebase(convoURL);
        $scope.displayMessages();
      };

      $scope.getAllUsers();

    }]);

})();
