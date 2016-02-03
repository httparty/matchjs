;(function() {
  'use strict';

  angular.module('app.inbox', ['firebase','ngSanitize','ui.select','luegg.directives'])
    .constant('moment', moment)
    .controller('InboxController', ['$scope', '$firebaseArray', '$firebaseObject', 'AuthService', 'connectModel', 'moment', 'inboxModel', '$state', 'Profile', '$location', '$anchorScroll', function($scope, $firebaseArray, $firebaseObject, AuthService, connectModel, moment, inboxModel, $state, Profile, $location, $anchorScroll) {

      var vm = this;
      
      // will store information of recipient for email notification
      var recipientInfo = {
      };

      vm.selected = undefined;

      //Firebase
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
      Check if user list contains a given user
      **************************************************************/
      var containsUser = function(list, user) {
        return _.findIndex(list, function(conversation) { 
          return conversation.username === user.username; 
        });
      };

      /*************************************************************
      Get all users for search bar and conversation history
      **************************************************************/ 
      vm.getAllUsers = function() {

        inboxModel.getAllFirebaseConvos(vm.username, baseURL, function(mapping) {

          // console.log("going through this loop again");
          // window.history.back(1);
          //scroll to bottom here

          //all historical conversations
          var conversations = mapping[1];
          //comparator used to sort historical conversations
          var comparator = mapping[0];

          connectModel.getAllUsers().then(function(r) {

            _.each(r.data, function(item) {

              //check if user is already populated in
              //search bar
              if (containsUser(vm.users, item) === -1) {
                //add user to search bar if not
                //current user
                if (item.username !== vm.username) {
                  vm.users.push(item);
                }
              }

              //Get all users that have a conversation
              //history with current user
              if (_.contains(conversations, item.username)) {

                //check if User has already been added
                //to conversation list
                if (containsUser(vm.conversationList, item) === -1) {
                  vm.conversationList.push(item);
                }
              }
            });

            //sort conversationList by timestamp in comparator
            //so that conversations are ordered by last messaged 
            vm.conversationList.sort(function(a,b) {
              return comparator[a.username] < comparator[b.username];
            });
            
            //if url contains state params, user came to inbox by way of another user's profile with the intention of messaging them, so switch to their conversation
            // if($state.params) {
            //   console.log("hitting this use case");
            //   Profile.getUserProfile($state.params)
            //   .then(function(r) {
            //     var selectedUser = r.data;
            //     vm.switchConversation(selectedUser);
            //   });
            // }

            //populate current conversation if there isn't a selected 
            //conversation
            if (vm.currentRecipient === '') {
              console.log('conversation is currently empty');
              vm.switchConversation(vm.conversationList[0]);
            }

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
      Send a message to a user in a current conversation
      **************************************************************/ 
      vm.sendMessage = function() {

        //Check if User has entered any text
        //If User has not entered text and
        if (vm.enteredText !== '') {

          vm.currentMessageList.$add({message : vm.enteredText, 
                                      toUsername: vm.currentRecipient, 
                                      to: vm.currentRecipientName, 
                                      fromUsername: vm.username, 
                                      from: vm.name, 
                                      time: moment().format('dddd MMMM Do, YYYY @ h:mmA')});
          
          //update last time conversation was updated
          var conversationTimestamp = $firebaseObject(firebaseConnection.child('updated'));
          conversationTimestamp.$value = moment().format();
          conversationTimestamp.$save();

          // trigger email notification to recipient
          inboxModel.sentMessage(recipientInfo);

          //clear entered text
          vm.enteredText = '';

          //scroll down to the bottom of the newly added message
          //Trying to attempt scrolling to the bottom
          // console.log("scrolling");
          // $location.hash('bottom');
          // $anchorScroll();
          // $location.hash('');
          // window.history.back(1);
          // $location.search('bottom', null)
        }
      };

      /*************************************************************
      Display all messages for a single conversation
      **************************************************************/
      vm.switchConversation = function(conversation) {

        vm.currentRecipient = conversation.username;
        vm.currentRecipientName = conversation.name;
        vm.currentRecipientPhoto = conversation.photo;

        //Update the current conversation
        var conversationName = [vm.currentRecipient, vm.username].sort();
        var conversationURL = baseURL + conversationName[0] + conversationName[1];
        firebaseConnection = new Firebase(conversationURL);

        // store recipient info for email notification
        recipientInfo.name = conversation.name;
        recipientInfo.username = conversation.username;
        recipientInfo.email = conversation.email;

        //Fetch all messages for that conversation
        vm.displayMessages();
      };

      /*************************************************************
      Event handler for when current user selects a user from
      the search bar
      **************************************************************/ 
      $scope.$watch('user.selected', function(value) {
        if ($scope.user.selected) {

          var user = $scope.user.selected;

          //Check if selected user has a conversation history 
          //with current user
          var userIndex = containsUser(vm.conversationList, user);
          if (userIndex > -1) {
            //Move conversation to the top of the list
            //by first removing it from where it is
            user = vm.conversationList.splice(userIndex, 1);
            vm.conversationList.unshift(user[0]);
          } else {
            //Move new conversation to the top of the list
            vm.conversationList.unshift(user);
          }
          //switch conversation
          // console.log("switch conversation");
          // vm.switchConversation(user)
        }
      });
  }]);
})();
