angular.module('app.inbox')
  .factory('Inbox', ['$http', function($http){

    //To Do:
      //-Change urls to reflect proper route
      //-Change method arguments to appropriate names

    var inbox = {};
    //Messages
    inbox.displayMessages = function(conversationDataObj){
      return $http({
        method: 'GET',
        url: '/api/inbox/displayMessages',
        data: conversationDataObj
      }).then(function(responseObj){
        return responseObj;
      }, function(responseObj){
        console.error('Error: ', responseObj);
      });
    };

    inbox.updateMessages = function(conversationDataObj){
      inbox.displayMessages(conversationDataObj);
    };

    inbox.sendMessage = function(messageDataObj){
      return $http({
        method: 'POST',
        url: '/api/inbox/sendMessage',
        data: messageDataObj
      }).then(function(responseObj){
        return responseObj;
      });
    };

    //Conversations
    inbox.displayConversations = function(userDataObj){
      return $http({
        method: 'GET',
        url: '/api/inbox/conversationList',
        data: userDataObj
      }).then(function(responseObj){
        return responseObj;
      });
    };

    inbox.switchConversation = function(userDataObj){
      return $http({
        method: 'GET',
        url: '/api/inbox/conversation',
        data: userDataObj
      }).then(function(responseObj){
        return responseObj;
      });
    };

    return inbox;
  }]);
