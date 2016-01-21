angular.module('app.inbox', [])
  .controller('InboxController', ['$scope', function($scope){
    console.log('Inbox Controller is working');

    // Scope Variables
    $scope.conversationList = [];
    $scope.currentMessageList = [];
    $scope.enteredText = "";

    // Message Logic
    $scope.displayMessages = function() {

    };
    $scope.updateMessages = function() {

    };
    $scope.sendMessage = function() {

    };

    // Conversation Logic
    $scope.displayConversations = function() {

    };
    $scope.updateConversations = function() {

    };
    $scope.switchConversation = function() {

    };
    $scope.deleteConversation = function() {

    }

  }]);
