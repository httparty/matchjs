angular.module('app.profile', [])
  .controller('ProfileController', ['$scope', '$window', '$state', 'Profile', 'AuthService', function ($scope, $window, $state, Profile, AuthService) {

    $scope.user = angular.fromJson(AuthService.getCurrentUser());

    $scope.user.toLearn = [];
    $scope.user.toTeach = [];

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

  //-------------------BASICS-----------------------------
    $scope.toggleEditShowBasics = function() {
      if($scope.saveEditButton.basics.buttonText === 'Edit') {
        $scope.saveEditButton.basics.buttonText = 'Save';
        $scope.selectedStyle.basics = {'background-color' : '#FFFFCC'};
      } else {
        $scope.saveEditButton.basics.buttonText='Edit';
        $scope.selectedStyle.basics = {'background-color' : '#FFFFFF'};
        updateProfile($scope.user); //call to fn 
      }
    };


  //---------SHARED BY BASICS, SKILLS, & SUMMARY------------
    var updateProfile = function() {
      for(var learnKey in $scope.skills.toLearn) {
          if(!contains(learnKey, $scope.skills.toLearn)) {
            $scope.user.toLearn.push(learnKey);         
          }   
      }
      for(var teachKey in $scope.skills.toTeach) {
        if(!contains(teachKey, $scope.skills.toTeach)) {
            $scope.user.toTeach.push(teachKey);
        }   
      }
      Profile.updateProfile($scope.user) //update DB
      .then(function(response) {
        console.log('server response to profile update:', response);
        $scope.getCurrentUserProfile();
      });
    };

    var contains = function(elem, arr) {
      for(var j = 0; j < arr.length; j++) {
        if (elem === arr[j]) {
          return true;
        }
      }
      return false;
    }

  //-------------------SKILLS-----------------------------
  		//called when SKILLS edit/show button is clicked
    $scope.toggleEditShowSkills = function() {
      if($scope.saveEditButton.skills.buttonText === 'Edit') {
        $scope.saveEditButton.skills.buttonText = 'Save';
        $scope.selectedStyle.skills = {'background-color' : '#FFFFCC'};
      } else {
        $scope.selectedStyle.skills = {'background-color' : '#FFFFFF'};
        updateProfile($scope.user);
        $scope.saveEditButton.skills.buttonText='Edit';
      } 
    };

  //-------------------SUMMARY---------------------------
    $scope.toggleEditShowSummary = function() {
      if($scope.saveEditButton.summary.buttonText === 'Edit') {
        $scope.saveEditButton.summary.buttonText = 'Save';
        $scope.selectedStyle.summary = {'background-color' : '#FFFFCC'};
      } else {
        $scope.selectedStyle.summary = {'background-color' : '#FFFFFF'};
        //call to fn that saves summary 
        updateProfile($scope.user); 
        $scope.saveEditButton.summary.buttonText='Edit';
      } 
    };

  //---------RETRIEVE USER PROFILE DATA FROM DB------------
  	//called on the initialization of the HTML page, ng-init
    $scope.getCurrentUserProfile = function() {
      console.log('hello inside get currentUserProfile');
      Profile.getCurrentUser($scope.user)
      .then(function(response) {
        console.log('response.data', response.data);
        $scope.user.location = response.data.location;
        $scope.user.name = response.data.displayName; //
        $scope.user.github = response.data.github;
        $scope.user.summary =	response.data.summary; 

        response.data.toLearn.forEach(function(skill) {
          $scope.skills.toLearn[skill] = true;
        });

        response.data.toTeach.forEach(function(skill) {
          $scope.skills.toTeach[skill] = true;
        });
      });
    };
}]);

//ng repeat with different filter for each 
//disable in the div? 
//refctor inline styling 