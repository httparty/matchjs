angular.module('app.inbox', [])
  .controller('InboxController', ['$scope', 'Inbox', function($scope, Inbox){
    console.log('Inbox Controller is working');

    // Scope Variables
    $scope.conversationList = ['Rachel', 'Polina', 'Anthony', 'Chris', 'Jeff'];
    $scope.conversationObject = {
        'Rachel': ['Hey!', 'How goes it?'],
        'Polina': ['Hi! Do you need a mentor?'],
        'Anthony': ['Whatsup man?', 'I was looking into this new framework, and was wondering if you wanted to help', 'It will be a lot of fun!'],
        'Chris': ['You will go back to your desk and nope... you do not gots it', 'I am a programming god, I made fire', 'that is my goal here... crush your spirits'],
        'Jeff': ['Im on vacation!']
    };
    $scope.currentMessageList = [];
    $scope.enteredText = '';

    // Message Logic
    $scope.displayMessages = function() {

    };
    $scope.updateMessages = function() {

    };
    $scope.sendMessage = function() {
        $scope.currentMessageList.push($scope.enteredText);
        Inbox.sendMessage({text: $scope.enteredText});
        $scope.enteredText = '';
    };

    // Conversation Logic
    $scope.displayConversations = function() {

    };
    $scope.updateConversations = function() {

    };
    $scope.switchConversation = function(conversation) {
        $scope.currentMessageList = $scope.conversationObject[conversation];
    };
    $scope.deleteConversation = function() {

    };

  }]);
