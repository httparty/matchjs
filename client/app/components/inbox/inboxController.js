;(function() {
  'use strict';

  angular.module('app.inbox', ['firebase','ngSanitize','ui.select'])
    .constant('moment', moment)
    .controller('InboxController', ['$scope', '$firebaseArray', '$firebaseObject', 'AuthService', 'connectModel', 'moment', 'inboxModel', function($scope, $firebaseArray, $firebaseObject, AuthService, connectModel, moment, inboxModel) {

      var vm = this;
      
      /*************************************************************
      Firebase
      **************************************************************/
      var baseURL = 'https://matchjs.firebaseio.com/chat/';
      var firebaseConnection = '';

      /*************************************************************
      Current User
      **************************************************************/
      var currentUser = angular.fromJson(AuthService.getCurrentUser());
      vm.username = currentUser.username;
      vm.name = currentUser.displayName;

      /*************************************************************
      Current conversation
      Person with whom you are current having a conversation with
      **************************************************************/
      vm.currentRecipient = '';
      vm.currentMessageList = [];
      vm.enteredText = '';

      /*************************************************************
      All past conversations
      **************************************************************/
      vm.conversationList = [];

      /*************************************************************
      Search Bar
      **************************************************************/
      //all users available to search
      vm.users = [];
      //user selected from search
      $scope.user = {};

      /*************************************************************
      Get all users for search bar and conversation history
      **************************************************************/ 
      vm.getAllUsers = function() {

        inboxModel.getAllFirebaseConvos(vm.username, baseURL, function(mapping) {

          var result = mapping[1];
          var comparator = mapping[0];

          connectModel.getAllUsers().then(function(r) {

            _.each(r.data, function(item) {

              if (item.username !== vm.username) {
                vm.users.push(item);
              }

              if (_.contains(result, item.username)) {

                if (containsUser(item) === -1) {
                  vm.conversationList.push(item);
                }
              }
            });

            //sort conversationList by timestamp in comparator
            //so that users are ordered by last messaged 
            vm.conversationList.sort(function(a,b) {
              return comparator[a.username] < comparator[b.username];
            });
          });
        });      
      };

      /*************************************************************
      Display all messages for a single conversation
      **************************************************************/ 
      vm.displayMessages = function() {
        vm.currentMessageList = $firebaseArray(firebaseConnection.child('messages'));
      };

      /*************************************************************
      Display all messages for a single conversation
      **************************************************************/ 
      vm.sendMessage = function() {

        if (vm.enteredText !== '') {
          var now = moment().format('dddd MMMM Do, YYYY @ h:mA');

          vm.currentMessageList.$add({message : vm.enteredText, toUsername: vm.currentRecipient, to: vm.currentRecipientName, fromUsername: vm.username, from: vm.name, time: now});
          //update last time conversation was updated
          var convoTimestamp = $firebaseObject(firebaseConnection.child('updated'));

          convoTimestamp.$value = moment().format();
          convoTimestamp.$save();
          vm.enteredText = '';
        }
      };

      /*************************************************************
      Display all messages for a single conversation
      **************************************************************/
      vm.switchConversation = function(conversation) {

        vm.currentRecipient = conversation.username;
        vm.currentRecipientName = conversation.name;
        vm.currentRecipientPhoto = conversation.photo;
        var arr = [vm.currentRecipient, vm.username].sort();
        var convoURL = baseURL + arr[0] + arr[1];
        firebaseConnection = new Firebase(convoURL);
        vm.displayMessages();
      };

      //check if user is already in the conversation list
      var containsUser = function(user) {
        return _.findIndex(vm.conversationList, function(conversation){ return conversation.username === user.username; });
      };

      //watch if someone selects a user from the drop down
      $scope.$watch('user.selected', function(value) {

        if ($scope.user.selected) {

          var user = $scope.user.selected;
          var userIndex = _.findIndex(vm.conversationList, function(conversation){ return conversation.username === user.username; });

          if (userIndex > -1) {
            //remove user and place them to the top of the list
            user = vm.conversationList.splice(userIndex, 1);

            vm.conversationList.unshift(user[0]);
          } else {

            vm.conversationList.unshift(user);
          }

        }
      });

    }]);

})();