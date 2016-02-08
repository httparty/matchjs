;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', 'Profile',function(invitationsModel, AuthService, $state, Profile){

    var vm = this;

//Submission Form Data
    vm.formData = {};

//Loading User Information

    // Current User Information
    var current_user = angular.fromJson(AuthService.getCurrentUser());
    vm.username = current_user.username;
    vm.name = current_user.displayName;

    Profile.getUserProfile({username: vm.username}).then(function(response){
      vm.currentUserProfile = response.data;
      vm.formData.mentorEmail = vm.currentUserProfile.email;
    });

    //Recipient Information
    vm.recipientUsername = $state.params.username;

    Profile.getUserProfile($state.params).then(function(response){
      vm.recipientProfile = response.data;
      if(vm.recipientProfile === ''){ $state.go('home')};
      vm.recipientName = vm.recipientProfile.name;
      vm.formData.menteeEmail = vm.recipientProfile.email;
    });


//Scope Variables
    //Submission Form Data

    vm.date = new Date(); //Sets time/date to current

    //Set meeting time
    vm.minDate = new Date(); //Blocks past dates
    vm.maxDate = new Date(2050, 5, 22); //Set Max Date

    vm.ismeridian = true;  //AM/PM or 24H
    vm.hstep = 1;  //Hour Step
    vm.mstep = 15;  //Minute Step
    vm.submitted = false;  //Hides form upon submission


    //Date formating
    vm.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']; //Alternate formats

    vm.format = vm.formats[0];
    vm.altInputFormats = ['M!/d!/yyyy'];

    //Calendar popup
    vm.isCalendarOpen = false;



//Helper Functions

    //Toggles AM/PM or 24HR
    vm.toggleMode = function() {
      vm.ismeridian = ! vm.ismeridian;
    };

    //Resets Date/Time to Present
    vm.clear = function() {
      vm.date = new Date();
    };

    //Open the calendar
    vm.openCalendar = function() {
      vm.isCalendarOpen = true;
    };


    //Rounds the time to nearest 15 minutes
    vm.roundTime = function(){
      var currentMinute = vm.date.getMinutes();
      vm.date.setMinutes(currentMinute + vm.mstep - currentMinute % vm.mstep);
    };

    vm.roundTime(); //Immediately Invoked

    //Alerts
    vm.alerts = [];
    vm.addAlert = function() {
      if(vm.alerts.length === 0){
        vm.alerts.push({type: 'danger', msg: 'Please fill out all of the form fields'});
      }
    };
    vm.closeAlert = function() {
      vm.alerts = [];
    };

//Submission Functions

    //No submission if form is incomplete
    vm.attemptSubmit = function() {
      if(!vm.formData.sessionInfo || !vm.formData.sessionInfo.summary || !vm.formData.sessionInfo.where){
        vm.addAlert();
        return false;
      }
      else{
        vm.createInvitation();
        return true;
      }
    };

    //Submits the actual invitation
    vm.createInvitation = function() {
      console.log('Invitation Submitted!');
      vm.formData.mentor = vm.name;
      vm.formData.mentee = vm.recipientName;
      vm.formData.mentorUsername = vm.username;
      vm.formData.menteeUsername = vm.recipientUsername;
      vm.formData.sessionInfo.when = new Date(vm.date.getFullYear(), vm.date.getMonth(), vm.date.getDate(), vm.date.getHours(), vm.date.getMinutes());
      vm.formData.mentorEmailPreferences = vm.currentUserProfile.wantInvitationEmails;
      vm.formData.menteeEmailPreferences = vm.recipientProfile.wantInvitationEmails;
      vm.submitted = true;
      invitationsModel.createInvitation(vm.formData)
        .then(function(r){
          vm.formData = {};
          vm.clear();
      });
    };

  }]);
})();
