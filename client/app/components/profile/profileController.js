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

  //-------------------BASICS----------------------------
    $scope.toggleEditShowBasics = function() {
      console.log('inside toggle edit show basics fn');
      if($scope.saveEditButton.basics.buttonText === 'Edit') {
        $scope.saveEditButton.basics.buttonText = 'Save';
        $scope.selectedStyle.basics = {'background-color' : '#FFFFCC'};
      } else {
        $scope.saveEditButton.basics.buttonText='Edit';
        $scope.selectedStyle.basics = {'background-color' : '#FFFFFF'};
        $scope.updateProfileBasics(); //call to fn 
      }
    };


  //------------SHARED BY BASICS & SUMMARY---------------
    $scope.updateProfileBasics = function() {
      Profile.updateProfileBasics($scope.user) //update DB
      .then(function(response) {
        console.log('here is the server response to BASICS update', response);
      });
    };

  //-------------------SKILLS----------------------------
  		//called when SKILLS edit/show button is clicked
    $scope.toggleEditShowSkills = function() {
      if($scope.saveEditButton.skills.buttonText === 'Edit') {
        $scope.saveEditButton.skills.buttonText = 'Save';
        $scope.selectedStyle.skills = {'background-color' : '#FFFFCC'};
      } else {
        $scope.selectedStyle.skills = {'background-color' : '#FFFFFF'};
        for(var learnKey in $scope.skills.toLearn) {
          // console.log('here is toLEarn skill:', learnKey);
          if(!contains(learnKey, $scope.skills.toLearn)) {
            $scope.user.toLearn.push(learnKey);					
          }   
        }
        for(var teachKey in $scope.skills.toTeach) {
          // console.log('here is toTeach skill:', teachKey); 
          if(!contains(teachKey, $scope.skills.toTeach)) {
            $scope.user.toTeach.push(teachKey);
          }   
        }

        console.log('$scope.user.toTeach', $scope.user.toTeach);
        console.log('$scope.user.toLearn', $scope.user.toLearn);

        $scope.updateProfileBasics($scope.user); //call to fn that saves the skills 
        $scope.saveEditButton.skills.buttonText='Edit';
      } 
    };

    var contains = function(elem, arr) {
      for(var j = 0; j < arr.length; j++) {
        if (elem === arr[j]) {
          return true;
        }
      }
      return false;
    }

    //called from within toggleEditShowSkills
    $scope.updateProfileSkills = function() {
      console.log('hello inside update skills!');
      Profile.updateProfileSkills($scope.user)
        .then(function(response) {
        console.log('here is the server response to SKILLS update', response);
      });
    };

  //-------------------SUMMARY---------------------------
    $scope.toggleEditShowSummary = function() {
      if($scope.saveEditButton.summary.buttonText === 'Edit') {
        $scope.saveEditButton.summary.buttonText = 'Save';
        $scope.selectedStyle.summary = {'background-color' : '#FFFFCC'};
      } else {
        $scope.selectedStyle.summary = {'background-color' : '#FFFFFF'};
        $scope.updateProfileBasics($scope.user); //call to fn that saves skills 
        $scope.saveEditButton.summary.buttonText='Edit';
      } 
    };

  //---------RETRIEVE USER PROFILE DATA FROM DB------------
  		//called on the initialization of the page
    $scope.getCurrentUserProfile = function() {
      console.log('hello inside get currentUserProfile');
      Profile.getCurrentUser($scope.user)
      .then(function(response) {
        console.log('response.data', response.data);
        $scope.user.location = response.data.location;
        $scope.user.name = response.data.location;
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