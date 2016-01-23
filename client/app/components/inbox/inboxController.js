angular.module('app.inbox', ['firebase'])
  .controller('InboxController', ['$scope', 'Inbox', 'AuthService', 'connectModel', '$firebaseObject', '$firebaseArray',function($scope, Inbox, AuthService, connectModel, $firebaseObject, $firebaseArray){

    //Firebase setup
    var baseURL = 'https://matchjs.firebaseio.com/chat/';
    var myFirebaseRef = '';

    // Scope Variables
    var user = angular.fromJson(AuthService.getCurrentUser());
    $scope.username = user.username;
    $scope.conversationList = [];

    //Person with whom you are currently chatting
    $scope.currentRecipient = '';
    $scope.currentMessageList = [];
    $scope.enteredText = '';

    // Message Logic
    $scope.displayMessages = function() {
      $scope.currentMessageList = $firebaseArray(myFirebaseRef.child('messages'));
    };
    $scope.sendMessage = function() {
        $scope.currentMessageList.$add({message : $scope.enteredText, to: $scope.currentRecipient, from: $scope.username});
        $scope.enteredText = '';
    };

    // Conversation Logic
    $scope.getAllUsers = function(){
      connectModel.getAllUsers().then(function(r) {
          $scope.conversationList = r.data;
      });
    };

    $scope.switchConversation = function(conversation) {
        $scope.currentRecipient = conversation.username;
        var arr = [$scope.currentRecipient, $scope.username].sort();
        var convoURL = baseURL + arr[0] + arr[1];
        myFirebaseRef = new Firebase(convoURL);
        $scope.displayMessages();
    };

    $scope.getAllUsers();

  }]);
