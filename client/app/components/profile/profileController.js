angular.module('app.profile', [])
  .constant('moment', moment)
  .controller('ProfileController', ['$scope', '$window', '$state', 'Profile', 'AuthService', 'invitationsModel', function ($scope, $window, $state, Profile, AuthService, invitationsModel) { 

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

  // $scope.invitations = [];

  $scope.UImessages = {};

  // $scope.inviteSent = '';



  // $scope.selectedInvite = {};
  // $scope.selectedInvite.invite = null;



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
  var updateProfile = function() {
    for(var learnKey in $scope.skills.toLearn) {
        if(!_.contains($scope.skills.toLearn, learnKey)) {
          $scope.profileUser.toLearn.push(learnKey);
        }
        if(!$scope.skills.toLearn[learnKey]) {
          $scope.profileUser.toLearn.splice($scope.profileUser.toLearn.indexOf(learnKey),1);
        }
    }
    for(var teachKey in $scope.skills.toTeach) {
      if(!_.contains($scope.skills.toTeach, teachKey)) {
          $scope.profileUser.toTeach.push(teachKey);
      }
      if(!$scope.skills.toTeach[teachKey]) {
        $scope.profileUser.toTeach.splice($scope.profileUser.toTeach.indexOf(teachKey),1);
      }
    }
    Profile.updateProfile($scope.profileUser) //update DB
    .then(function(response) {
      console.log('server response to profile update:', response);
      $scope.getUserProfile();
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
      //call to fn that saves summary
      updateProfile($scope.profileUser);
      $scope.saveEditButton.summary.buttonText='Edit';
    }
  };
  //--------------CREATE INVITATION -------------
  
  $scope.toggleInviteEditForm = function(inviteId) {
    if($scope.saveEditButton.invites.buttonText === 'Edit') {
      $scope.saveEditButton.invites.buttonText = 'Save';
    } else {
      // $scope.inviteUpdate.id = inviteId;
      // updateInvite($scope.inviteUpdate);
      $scope.saveEditButton.invites.buttonText = 'Edit';
    }
  };

  $scope.updateInvite = function(username, recipient, inviteId, inviteObj) {
    inviteObj.id = inviteId;
    inviteObj.username = username;
    // console.log(inviteObj);
    invitationsModel.updateInvitation(inviteObj)
      .then(function(response) {
        $scope.UImessages.inviteUpdated = 'Your invitation has been updated, and ' + recipient + ' has been notified.';
        console.log('here is the updated invite', response.data);
        $scope.editMode.inviteEditMode = -1;
        getUserInvitations(username);
      });
  };

  $scope.deleteInvite = function(invite) {
    // console.log(invite);
    invitationsModel.deleteInvitation(invite)
      .then(function(response) {
        invite = response.body;
        //add message text
      })
  };


  var getUserInvitations = function(username) {
    console.log('hello inside get user invites fn', username);
    $scope.invitations = [];
    var invites = [];
    invitationsModel.getInvitationsByMentor(username)
    .then(function(mentorResp) {
      console.log('mentorResp', mentorResp);
      mentorResp.data.forEach(function(invite) {
        invite.when = moment(invite.when).format('dddd, MMMM Do YYYY, h:mm a');
        invites.push(invite);                
      });
      invitationsModel.getInvitationsByMentee(username)
        .then(function(menteeResp) {
          menteeResp.data.forEach(function(invite) {
            invite.when = moment(invite.when).format('dddd, MMMM Do YYYY, h:mm a');
            invite.readOnly = true;
            console.log('NOWWWW invite.when', invite);
            invites.push(invite);
          });
          if(invites.length === 0) {
            $scope.UImessages.noInvites = 'You have no current invitations. Connect with more users to set up a mentorship session.'; 
          } 
            $scope.invitations = invites;
        });
    });
  };


  //---------RETRIEVE USER PROFILE DATA FROM DB--
  	//called on the initialization of the HTML page, ng-init
  $scope.getUserProfile = function() {
    Profile.getUserProfile($state.params)
    .then(function(response) {
      //---if profile belongs to current user, set isSameUser var to true. This toggles the visibility of the edit buttons.
      if($scope.currentUser.username === $scope.profileUser.username) {
        console.log('here it is!', $scope.currentUser.username);
        $scope.editMode.isSameUser = true;
        getUserInvitations($scope.currentUser.username);
      }
      //---populate the scope with the data returning from DB query.---
      $scope.profileUser.photo = response.data.photo;
      $scope.profileUser.location = response.data.location;
      $scope.profileUser.name = response.data.displayName;
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
    });
  };

}]);
