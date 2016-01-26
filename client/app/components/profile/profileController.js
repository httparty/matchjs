angular.module('app.profile', [])
  .controller('ProfileController', ['$scope', '$window', '$state', 'Profile', 'AuthService', function ($scope, $window, $state, Profile, AuthService) {
    console.log('my parms', $state.params);
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

    $scope.selectedStyle = {};
    $scope.skills = {};
    $scope.skills.toLearn = {};
    $scope.skills.toTeach = {};
    $scope.skills.collection = ['AngularJS', 'Express', 'JavaScript', 'Backbone', 'Node.js', 'ReactJS'];

    $scope.isSameUser = '';

    $scope.invitations = {};

    $scope.inviteSent = '';

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
          if(!contains(learnKey, $scope.skills.toLearn)) {
            $scope.profileUser.toLearn.push(learnKey);         
          }  
          if(!$scope.skills.toLearn[learnKey]) {
            $scope.profileUser.toLearn.splice($scope.profileUser.toLearn.indexOf(learnKey),1);
          } 
      }
      for(var teachKey in $scope.skills.toTeach) {
        if(!contains(teachKey, $scope.skills.toTeach)) {
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

    var contains = function(elem, arr) {
      for(var j = 0; j < arr.length; j++) {
        if (elem === arr[j]) {
          return true;
        }
      }
      return false;
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
  $scope.createNewInvite = function(username) {
    //call to invitation controller 
    //set scope.inviteSent = true;
  };

  //---------RETRIEVE USER PROFILE DATA FROM DB--
  	//called on the initialization of the HTML page, ng-init
    $scope.getUserProfile = function() {
      Profile.getUserProfile($state.params) 
      .then(function(response) {
        //---if the current user is the user that owns the profile, set isSameUser variable to true. This toggles the visibility of the edit buttons.---
        if($scope.currentUser.username === $scope.profileUser.username) {
          $scope.isSameUser = true;
        }

        //---populate the scope with the data returning from DB query.---
        $scope.profileUser.photo = response.data.photo;
        $scope.profileUser.location = response.data.location;
        $scope.profileUser.name = response.data.displayName; 
        $scope.profileUser.github = response.data.github;
        $scope.profileUser.summary =	response.data.summary; 
        $scope.profileUser.displayName = response.data.displayName;
        response.data.toLearn.forEach(function(skill) {
          $scope.skills.toLearn[skill] = true;
        });
        response.data.toTeach.forEach(function(skill) {
          $scope.skills.toTeach[skill] = true;
        });

        //---
      });
    };
}]);