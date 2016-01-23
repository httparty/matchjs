angular.module('app.inbox', ['firebase'])
  .controller('InboxController', ['$scope', 'Inbox', 'AuthService', 'connectModel', '$firebaseObject', '$firebaseArray',function($scope, Inbox, AuthService, connectModel, $firebaseObject, $firebaseArray){

    // var myFirebaseRef = new Firebase("https://matchjs.firebaseio.com/chat");
    var count = 0;
    var baseURL = "https://matchjs.firebaseio.com/chat/";

    console.log('Inbox Controller is working');


    // Scope Variables
    var user = angular.fromJson(AuthService.getCurrentUser());
    $scope.username = user.username;
    $scope.conversationList = [];

    connectModel.getAllUsers().then(function(r) {
        console.dir(r.data);
        $scope.conversationList = r.data;
    });
    // $scope.conversationList = ['Rachel', 'Polina', 'Anthony', 'Chris', 'Jeff'];
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
        $scope.currentRecipient = conversation.username;

        var arr = [$scope.currentRecipient, $scope.username];
        arr.sort();

        console.log(arr[0] + arr[1]);
        var convoURL = baseURL + arr[0] + arr[1];
        var myFirebaseRef = new Firebase(convoURL);
        // myFirebaseRef.set({'rachel': 'How goes it'});
        var messages = $firebaseArray(myFirebaseRef.child('messages'));

        messages.$add({count : 'Arr'});
        console.log(messages);

        console.log($firebaseArray(myFirebaseRef.child('messages')));

        //We can generate new conversations

        //Refactor above code and split it up
        //Add scope variable online 72
        //

        // console.log(myFirebaseRef.child('messages').get());
        // $scope.messages = $firebaseObject(myFirebaseRef.limit(15));
        // $scope.messages({'sup': 'sup'});
    };
    $scope.startNewConversation = function() {
        $scope.conversationList.push($scope.newConvoName);
        $scope.conversationObject[$scope.newConvoName] = [];
        $scope.newConvoName = '';

    };
    $scope.deleteConversation = function() {

    };

  }]);
