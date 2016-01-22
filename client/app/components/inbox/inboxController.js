angular.module('app.inbox', [])
  .controller('InboxController', ['$scope', 'Inbox', 'AuthService',  function($scope, Inbox, AuthService){
    console.log('Inbox Controller is working');

    // Scope Variables
    var user = angular.fromJson(AuthService.getCurrentUser());
    $scope.username = user.username;
    $scope.conversationList = ['Rachel', 'Polina', 'Anthony', 'Chris', 'Jeff'];
    $scope.conversationObject = {
        'Rachel': ['Hey!', 'How goes it?'],
        'Polina': ['Hi! Do you need a mentor?'],
        'Anthony': ['Whatsup man?', 'I was looking into this new framework, and was wondering if you wanted to help', 'It will be a lot of fun!'],
        'Chris': ['You will go back to your desk and nope... you do not gots it', 'I am a programming god, I made fire', 'that is my goal here... crush your spirits'],
        'Jeff': ['Im on vacation!']
    };

    //Person with whom you are currently chatting
    $scope.currentRecipient = '';
    $scope.currentMessageList = [];
    $scope.enteredText = '';

    //Name of the person with whom you want to start a new conversation
    $scope.newConvoName = '';


    // Message Logic
    $scope.displayMessages = function() {

    };
    $scope.updateMessages = function() {

    };
    $scope.sendMessage = function() {
        $scope.currentMessageList.push($scope.username +': ' + $scope.enteredText);
        Inbox.sendMessage({text: $scope.enteredText});
        $scope.enteredText = '';
    };

    // Conversation Logic
    $scope.displayConversations = function() {

    };
    $scope.updateConversations = function() {

    };
    $scope.switchConversation = function(conversation) {
        // console.log($scope.username);
        $scope.currentMessageList = $scope.conversationObject[conversation];
        $scope.currentRecipient = conversation;
    };
    $scope.startNewConversation = function() {
        $scope.conversationList.push($scope.newConvoName);
        $scope.conversationObject[$scope.newConvoName] = [];
        $scope.newConvoName = '';

    };
    $scope.deleteConversation = function() {

    };

  }]);
