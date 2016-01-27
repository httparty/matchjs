;(function() {
  'use strict';

  angular.module('app.inbox', ['firebase'])
    .controller('InboxController', ['$scope', '$firebaseArray', 'AuthService', 'connectModel', function($scope, $firebaseArray, AuthService, connectModel) {

      var vm = this;

      //Firebase
      var baseURL = 'https://matchjs.firebaseio.com/chat/';
      var firebaseConnection = '';

      var currentUser = angular.fromJson(AuthService.getCurrentUser());
      vm.username = currentUser.username;
      vm.conversationList = [];

      //Person with whom you are currently chatting
      vm.currentRecipient = '';
      vm.currentMessageList = [];
      vm.enteredText = '';

      vm.getAllUsers = function() {

        connectModel.getAllUsers().then(function(r) {
          vm.conversationList = r.data;
        });
      };

      vm.displayMessages = function() {
        
        vm.currentMessageList = $firebaseArray(firebaseConnection.child('messages'));
      };

      vm.sendMessage = function() {

        vm.currentMessageList.$add({message : vm.enteredText, to: vm.currentRecipient, from: vm.username});
        vm.enteredText = '';
      };

      vm.switchConversation = function(conversation) {

        vm.currentRecipient = conversation.username;
        vm.currentRecipientName = conversation.name;
        vm.currentRecipientPhoto = conversation.photo;
        var arr = [vm.currentRecipient, vm.username].sort();
        var convoURL = baseURL + arr[0] + arr[1];
        firebaseConnection = new Firebase(convoURL);
        vm.displayMessages();
      };

      vm.getAllUsers();

    }]);

})();
