angular.module('app.inbox')
  .factory('Inbox', ['$http', function($http){

    //To Do:
      //-Change urls to reflect proper route
      //-Change method arguments to appropriate names

    //Messages
    var displayMessages = function(conversationDataObj){
      return $http({
        method: 'GET',
        url: '/api/inbox/',
        data: conversationDataObj
      }).then(function(responseObj){
        return responseObj;
      })
    };

    var updateMessages = function(conversationDataObj){
      displayMessages(conversationDataObj);
    };

    var sendMessage = function(messageDataObj){
      return $http({
        method: 'POST',
        url: '/api/inbox',
        data: messageDataObj
      }).then(function(responseObj){
        return responseObj;
      })
    };

    //Conversations
    var displayConversations = function(userDataObj){
      return $http({
        method: 'GET',
        url: '/api/inbox',
        data: userDataObj
      }).then(function(responseObj){
        return responseObj;
      })
    };

    var switchConversation = function(userDataObj){
      return $http({
        method: 'GET',
        url: '/api/inbox',
        data: userDataObj
      }).then(function(responseObj){
        return responseObj;
      })
    };

  }]);
