;(function() {
  'use strict';
    
  angular.module('app.profile', [])
    .constant('moment', moment)
    .controller('ProfileController', ['$scope', '$window', '$state', 'Profile','$sce', 'AuthService', 'invitationsModel', '$location', function ($scope, $window, $state, Profile, $sce, AuthService, invitationsModel, $location) {

    var current = new Date();

    $scope.currentUser = angular.fromJson(AuthService.getCurrentUser());

    $scope.profileUser = {};
    $scope.profileUser.username = $state.params.username;

    $scope.profileUser.toLearn = [];
    $scope.profileUser.toTeach = [];

    $scope.saveEditButton = {};
    $scope.saveEditButton.skills = {};
    $scope.saveEditButton.skills.buttonText = 'Edit';
    $scope.saveEditButton.basics = {};
    $scope.saveEditButton.basics.buttonText = 'Edit';
    $scope.saveEditButton.summary = {};
    $scope.saveEditButton.summary.buttonText = 'Edit';
    $scope.saveEditButton.invites = {};
    $scope.saveEditButton.invites.buttonText = 'Edit';

    $scope.selectedStyle = {};
    $scope.skills = {};
    $scope.skills.toLearn = {};
    $scope.skills.toTeach = {};
    $scope.skills.collection = ['AngularJS', 'Express', 'JavaScript', 'Backbone', 'Node.js', 'ReactJS'];

    $scope.editMode = {};
    $scope.editMode.isSameUser = '';
    $scope.editMode.inviteEditMode = '';
    $scope.editMode.isPadawan = '';

    $scope.UImessages = {};



    //-------------------BASICS--------------------
    $scope.toggleEditShowBasics = function() {
      if($scope.saveEditButton.basics.buttonText === 'Edit') {
        $scope.saveEditButton.basics.buttonText = 'Save';
        $scope.selectedStyle.basics = {'background-color' : '#FFFFCC'};
      } else {
        $scope.saveEditButton.basics.buttonText='Edit';
        $scope.selectedStyle.basics = {'background-color' : '#FFFFFF'};
        updateProfile($scope.profileUser); //call to fn
      }
    };


    //---------SHARED BY BASICS, SKILLS, & SUMMARY-
    var updateProfile = function(userObj) {
      for(var learnKey in $scope.skills.toLearn) {
          if(!_.contains($scope.skills.toLearn, learnKey)) {
            userObj.toLearn.push(learnKey);
          }
          if(!$scope.skills.toLearn[learnKey]) {
            userObj.toLearn.splice(userObj.toLearn.indexOf(learnKey),1);
          }
      }
      for(var teachKey in $scope.skills.toTeach) {
        if(!_.contains($scope.skills.toTeach, teachKey)) {
            userObj.toTeach.push(teachKey);
        }
        if(!$scope.skills.toTeach[teachKey]) {
          userObj.toTeach.splice(userObj.toTeach.indexOf(teachKey),1);
        }
      }
      Profile.updateProfile(userObj) //update DB
      .then(function(response) {
        $scope.getUserProfile(userObj);
      });
    };

    //-------------------SKILLS--------------------
    		//called when SKILLS edit/show button is clicked
    $scope.toggleEditShowSkills = function() {
      if($scope.saveEditButton.skills.buttonText === 'Edit') {
        $scope.saveEditButton.skills.buttonText = 'Save';
        $scope.selectedStyle.skills = {'background-color' : '#FFFFCC'};
      } else {
        $scope.selectedStyle.skills = {'background-color' : '#FFFFFF'};
        updateProfile($scope.profileUser);
        $scope.saveEditButton.skills.buttonText='Edit';
      }
    };

    //-------------------SUMMARY-------------------
    $scope.toggleEditShowSummary = function() {
      if($scope.saveEditButton.summary.buttonText === 'Edit') {
        $scope.saveEditButton.summary.buttonText = 'Save';
        $scope.selectedStyle.summary = {'background-color' : '#FFFFCC'};
      } else {
        $scope.selectedStyle.summary = {'background-color' : '#FFFFFF'};
        updateProfile($scope.profileUser);
        $scope.saveEditButton.summary.buttonText='Edit';
      }
    };
    //-----------------INVITATIONS ----------------
    
    $scope.toggleInviteEditForm = function(inviteId) {
      if($scope.saveEditButton.invites.buttonText === 'Edit') {
        $scope.saveEditButton.invites.buttonText = 'Save';
      } else {
        $scope.saveEditButton.invites.buttonText = 'Edit';
      }
    };

    $scope.updateInvite = function(username, recipient, inviteId, inviteObj) {
      inviteObj.id = inviteId;
      inviteObj.username = username;
      inviteObj.mentee = recipient;
      invitationsModel.updateInvitation(inviteObj)
        .then(function(response) {
          $scope.UImessages.inviteUpdated = 'Your invitation has been updated, and ' + recipient + ' has been notified.';
          $scope.editMode.inviteEditMode = -1;
          getUserInvitations(username);
        });
    };

    $scope.deleteInvite = function(invite) {
      console.log('here is invite of deleteInvite', invite);
      invitationsModel.deleteInvitation(invite)
        .then(function(response) {
          //add message text
          getUserInvitations($state.params.username);
        });
    };

    var getUserInvitations = function(username) {
      $scope.invitations = [];
      var invites = [];
      invitationsModel.getInvitationsByMentor(username)
      .then(function(mentorResp) {
        mentorResp.data.forEach(function(invite) {
          console.log("HERE IS INVITE - MENTORRR", invite);
          invite.when = moment(invite.when).format('dddd, MMMM Do YYYY, h:mm a');
          invites.push(invite);                
          invitationsModel.getInvitationsByMentee(username)
            .then(function(menteeResp) {
              menteeResp.data.forEach(function(invite) {
                console.log("HERE IS INVITE - MENTEE", invite);
                invite.when = moment(invite.when).format('dddd, MMMM Do YYYY, h:mm a');
                invite.readOnly = true;
                invites.push(invite);
              });
              if(invites.length === 0) {
                $scope.UImessages.noInvites = $sce.trustAsHtml('You have no current invitations. <a href="/">Connect with more users</a> to set up a mentorship session.'); 
              } 
                $scope.invitations = invites;
            });
        });
      });
    };

    //-------------------PADAWAN--------------------

    $scope.becomePadawan = function(mentor, padawan) {
      Profile.addPadawan(mentor, padawan)
      .then(function(response) {
        $scope.editMode.isPadawan = true;
        console.log('here is response', response);
      });
    };

    $scope.stopBeingAPadawan = function(mentor, padawan) {
      Profile.deletePadawan(mentor, padawan)  
      .then(function(response) {
        $scope.editMode.isPadawan = false;
        getPadawans(mentor);
      }); 
    };

    var getPadawans = function(mentor) {
      Profile.getPadawans(mentor)  
      .then(function(response) {
        console.log('here are the padawans', response.data);
        if($scope.currentUser.username === $scope.profileUser.username) {
          $scope.padawans = response.data;
        }
        for(var i = 0; i < response.data.length; i++) {
          if (response.data[i].padawanUsername === $scope.currentUser.username) {
            $scope.editMode.isPadawan = true;
          }
        }
      });
    };

    //---------------GET USER PROFILE---------------
    	//called on the initialization of the HTML page, ng-init
    $scope.getUserProfile = function(userObj) {
      Profile.getUserProfile(userObj)
      .then(function(response) {
        //---if profile belongs to current user, set isSameUser var to true. This toggles the visibility of the edit buttons.
        if($scope.currentUser.username === $scope.profileUser.username) {
          $scope.editMode.isSameUser = true;
          getUserInvitations($scope.currentUser.username);
        }
        getPadawans($scope.profileUser);
        //CALL TO GET USER PADAWANS HERE
        //---populate the scope with the data returning from DB query.---
        $scope.profileUser.photo = response.data.photo;
        $scope.profileUser.location = response.data.location;
        // $scope.profileUser.name = response.data.displayName;
        $scope.profileUser.name = (response.data.username === $scope.currentUser.username ? $scope.currentUser.displayName : response.data.name);
        $scope.profileUser.github = response.data.github;
        $scope.profileUser.karmaPoints = response.data.karmaPoints;
        $scope.profileUser.summary =	response.data.summary;
        $scope.profileUser.displayName = response.data.displayName;
        response.data.toLearn.forEach(function(skill) {
          $scope.skills.toLearn[skill] = true;
        });
        response.data.toTeach.forEach(function(skill) {
          $scope.skills.toTeach[skill] = true;
        });
        $scope.contentLoaded = true;
      });
    };

    $scope.goToOtherUserProfile = function(username) {
      $location.path('profile/' + username);
    }; 

    $scope.sendMessage = function(username) {
      $location.path('inbox');
    }; 
  }]);
})();
