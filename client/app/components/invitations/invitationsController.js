;(function(){
  'use strict';
  angular.module('app.invitations', [])
  .controller('invitationsController', ['invitationsModel', 'AuthService', '$state', 'Profile',function(invitationsModel, AuthService, $state, Profile){

    var vm = this;

    var current_user = angular.fromJson(AuthService.getCurrentUser());
    vm.username = current_user.username;
    vm.recipient = $state.params.username;

    Profile.getUserProfile($state.params).then(function(response){
      vm.recipientProfile = response.data;
    });

    vm.formData = {};

    vm.createInvitation = function() {
      console.log('Invitation Submitted!');
      vm.formData.mentor = vm.username;
      vm.formData.mentee = vm.recipient;
      vm.formData.sessionInfo.when = new Date(vm.dt.getFullYear(), vm.dt.getMonth(), vm.dt.getDate(), vm.tm.getHours(), vm.tm.getMinutes());
      console.dir(vm.formData);
      invitationsModel.createInvitation(vm.formData)
        .then(function(r){
          console.dir(r.data);
          vm.formData = {};
          vm.clear();
      });

      // .then(function(r){
      //   console.dir(r.data);
      //   vm.user = r.data;
      // });
    };

    //Set meeting time
    vm.minDate = new Date();
    vm.myTime = new Date();
    vm.ismeridian = true;

    vm.hstep = 1;
    vm.mstep = 5;
    vm.tm = null;
    vm.dt = null;


    vm.toggleMode = function() {
      vm.ismeridian = ! vm.ismeridian;
    };

    vm.clear = function() {
      vm.tm = null;
      vm.dt = null;
    };

//Date picker code


  vm.maxDate = new Date(2050, 5, 22);

  vm.open1 = function() {
    vm.popup1.opened = true;
  };

//Not used, utility function
  vm.setDate = function(year, month, day) {
    vm.dt = new Date(year, month, day);
  };

  vm.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  vm.format = vm.formats[0];
  vm.altInputFormats = ['M!/d!/yyyy'];

  vm.popup1 = {
    opened: false
  };

//Handling events in the calendar
//Needs refactoring

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);

  vm.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  vm.displayMinutesCorrectly = function(){
    var t = vm.tm.getMinutes();
    if(t < 10){
      return "0" + t;
    }
    return t;
  }

  vm.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < vm.events.length; i++) {
        var currentDay = new Date(vm.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return vm.events[i].status;
        }
      }
    }
    return '';
  };

  }]);
})();
