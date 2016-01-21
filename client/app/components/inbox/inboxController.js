angular.module('app.inbox', [])
  .controller('InboxController', ['$scope', function($scope){
    console.log('Inbox Controller is working');

    // Scope Variables
    $scope.conversationList = ['Rachel', 'Polina', 'Anthony', 'Chris', 'Jeff'];
    $scope.currentMessageList = [1, 2, 3, 4, 5];
    $scope.enteredText = "";

    // Message Logic
    $scope.displayMessages = function() {

    };
    $scope.updateMessages = function() {

    };
    $scope.sendMessage = function() {
        $scope.currentMessageList.push($scope.enteredText);
        $scope.enteredText = "";
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
