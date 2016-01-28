;(function() {
  'use strict';

  angular.module('app.inbox', ['firebase'])
    .constant('moment',moment)
    .controller('InboxController', ['$scope', '$firebaseArray', 'AuthService', 'connectModel', 'moment', function($scope, $firebaseArray, AuthService, connectModel, moment) {

      var vm = this;
      vm.selected = undefined;
      vm.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

      //Firebase
      var baseURL = 'https://matchjs.firebaseio.com/chat/';
      var firebaseConnection = '';

      var currentUser = angular.fromJson(AuthService.getCurrentUser());

      vm.username = currentUser.username;
      vm.name = currentUser.displayName;
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
        var today = moment().format('dddd MMMM Do, YYYY @ h:mA');

        vm.currentMessageList.$add({message : vm.enteredText, toUsername: vm.currentRecipient, to: vm.currentRecipientName, fromUsername: vm.username, from: vm.name, time: today});
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
