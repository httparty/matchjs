;(function() {
  'use strict';
    
  angular.module('app.profile', [])
    .constant('moment', moment)
    .controller('ProfileController', ['$scope', '$window', '$state', 'Profile','$sce', 'AuthService', 'invitationsModel', '$location', function ($scope, $window, $state, Profile, $sce, AuthService, invitationsModel, $location) {

    var current = new Date();

    var vm = this;

    vm.currentUser = angular.fromJson(AuthService.getCurrentUser());

    vm.profileUser = {};
    vm.profileUser.username = $state.params.username;

    vm.profileUser.toLearn = [];
    vm.profileUser.toTeach = [];

    vm.saveEditButton = {};
    vm.saveEditButton.skills = {};
    vm.saveEditButton.skills.buttonText = 'Edit';
    vm.saveEditButton.basics = {};
    vm.saveEditButton.basics.buttonText = 'Edit';
    vm.saveEditButton.invites = {};
    vm.saveEditButton.invites.buttonText = 'Edit';

    vm.skills = {};
    vm.skills.toLearn = {};
    vm.skills.toTeach = {};
    vm.skills.collection = ['AngularJS', 'Express', 'JavaScript', 'Backbone', 'Node.js', 'ReactJS'];

    vm.editMode = {};
    vm.editMode.isSameUser = '';
    vm.editMode.inviteEditMode = '';
    vm.editMode.isPadawan = '';

    vm.UImessages = {};
    vm.UImessages.noInvites = $sce.trustAsHtml('You have no current invitations. <a href="/">Connect with more users</a> to set up a mentorship session.'); 
    // vm.UImessages.noPadawans = $sce.trustAsHtml('You don\'t have any followers yet. Make sure you\'ve selected some skills you\'re able to teach. Then, <a href="#/inbox"> start a conversation</a> with developers trying to acquire one of your teachable skills, and set up a mentorship session to start teaching.');
    vm.UImessages.noMentors = $sce.trustAsHtml('You haven\'t followed anyone yet. <a href="/">Find users</a> who can help teach you the skills you\'re trying to learn. Let them know you\'re interested in a mentorship session by following them.');


    //-------------------BASICS------------------------
    vm.toggleEditShowBasics = function() {
      if(vm.saveEditButton.basics.buttonText === 'Edit') {
        vm.saveEditButton.basics.buttonText = 'Save';
      } else {
        vm.saveEditButton.basics.buttonText='Edit';
        updateProfile(vm.profileUser); 
      }
    };


    //-------------------SKILLS------------------------
    		//called when SKILLS edit/show button is clicked
    vm.toggleEditShowSkills = function() {
      if(vm.saveEditButton.skills.buttonText === 'Edit') {
        vm.saveEditButton.skills.buttonText = 'Save';
      } else {
        updateProfile(vm.profileUser);
        vm.saveEditButton.skills.buttonText='Edit';
      }
    };


    //---------SHARED BY BASICS & SKILLS---------------
    var updateProfile = function(userObj) {
      for(var learnKey in vm.skills.toLearn) {
          if(!_.contains(vm.skills.toLearn, learnKey)) {
            userObj.toLearn.push(learnKey);
          }
          if(!vm.skills.toLearn[learnKey]) {
            userObj.toLearn.splice(userObj.toLearn.indexOf(learnKey),1);
          }
      }
      for(var teachKey in vm.skills.toTeach) {
        if(!_.contains(vm.skills.toTeach, teachKey)) {
            userObj.toTeach.push(teachKey);
        }
        if(!vm.skills.toTeach[teachKey]) {
          userObj.toTeach.splice(userObj.toTeach.indexOf(teachKey),1);
        }
      }
      Profile.updateProfile(userObj) 
      .then(function(response) {
        vm.getUserProfile(userObj);
      });
    };


    //-----------------INVITATIONS ----------------
    
    vm.toggleInviteEditForm = function(inviteId) {
      if(vm.saveEditButton.invites.buttonText === 'Edit') {
        vm.saveEditButton.invites.buttonText = 'Save';
      } else {
        vm.saveEditButton.invites.buttonText = 'Edit';
      }
    };

    vm.updateInvite = function(username, recipient, inviteId, inviteObj) {
      inviteObj.id = inviteId;
      inviteObj.username = username;
      inviteObj.mentee = recipient;
      invitationsModel.updateInvitation(inviteObj)
        .then(function(response) {
          vm.UImessages.inviteUpdated = 'Your invitation has been updated, and ' + recipient + ' has been notified.';
          vm.editMode.inviteEditMode = -1;
          getUserInvitations(username);
        });
    };

    vm.deleteInvite = function(invite) {
      invitationsModel.deleteInvitation(invite)
        .then(function(response) {
          //add message text
          getUserInvitations($state.params.username);
        });
    };

    var getUserInvitations = function(username) {

      vm.invitations = [];
      var invites = [];
      invitationsModel.getInvitationsByMentor(username)
      .then(function(mentorResp) {
        mentorResp.data.forEach(function(invite) {
          invite.when = moment(invite.when).format('dddd, MMMM Do YYYY, h:mm a');
          invites.push(invite);
          invitationsModel.getInvitationsByMentee(username)
            .then(function(menteeResp) {
              menteeResp.data.forEach(function(invite) {
                invite.when = moment(invite.when).format('dddd, MMMM Do YYYY, h:mm a');
                invite.readOnly = true;
                invites.push(invite);
              });
              if(invites.length === 0) {
                vm.UImessages.noInvites = $sce.trustAsHtml('You have no current invitations. <a href="/">Connect with more users</a> to set up a mentorship session.'); 
              }
              else {
                vm.UImessages.noInvites = '';
              }
                vm.invitations = invites;
            });
        });
      });
    };

    //-------------FOLLOWERS, AKA PADAWANS-----------------

    vm.becomePadawan = function(mentor, padawan) {
      Profile.addPadawan(mentor, padawan)
      .then(function(response) {
        vm.editMode.isPadawan = true;
      });
    };

    vm.stopBeingAPadawan = function(mentor, padawan) {
      Profile.deletePadawan(mentor, padawan)  
      .then(function(response) {
        vm.editMode.isPadawan = false;
        getPadawans(mentor);
      }); 
    };

    var getPadawans = function(mentor) {
      Profile.getPadawans(mentor)  
      .then(function(response) {
        vm.padawans = [];
        response.data.forEach(function(padawan, i) {
          if (padawan.padawanUsername === vm.currentUser.username) {
            vm.editMode.isPadawan = true;
          }
          if(padawan.padawanUsername) {
            var padawanObj = {username: padawan.padawanUsername};
            Profile.getUserProfile(padawanObj) 
            .then(function(response) {
              padawan.photo = response.data.photo;
              vm.padawans.push(padawan);
            });
          }
        });
        if(vm.padawans.length === 0) {
          // console.log('padawan leng 0');
          // vm.UImessages.noPadawans = $sce.trustAsHtml('You don\'t have any followers yet. Make sure you\'ve selected some skills you\'re able to teach. Then, <a href="#/inbox"> start a conversation</a> with developers trying to acquire one of your teachable skills, and set up a mentorship session to start teaching.');
        } else {
          vm.UImessages.noPadawans = '';
        }

      });
    };

    var getMentors = function(mentee) {
      Profile.getMentors(mentee)
      .then(function(response) {
        vm.mentors = response.data;
        vm.mentors.forEach(function(mentor) {
          var mentorObj = {username: mentor.mentorUsername};
          Profile.getUserProfile(mentorObj) 
          .then(function(response) {
            mentor.photo = response.data.photo;
          });
        });
        if(vm.mentors.length === 0) {
          vm.UImessages.noMentors = $sce.trustAsHtml('You haven\'t followed anyone yet. <a href="/">Find users</a> who can help teach you the skills you\'re trying to learn. Let them know you\'re interested in a mentorship session by following them.');
        } else {
          vm.UImessages.noMentors = '';
        }
      });
    };


    //---------------GET USER PROFILE---------------------
    	//called on the initialization of the HTML page, ng-init
    vm.getUserProfile = function(userObj) {
      Profile.getUserProfile(userObj)
      .then(function(response) {
        //---if profile belongs to current user, set isSameUser var to true. This toggles the visibility of the edit buttons.
        if(vm.currentUser.username === vm.profileUser.username) {
          vm.editMode.isSameUser = true;
          getUserInvitations(vm.currentUser.username);
        }
        getPadawans(vm.profileUser);
        getMentors(vm.profileUser);

        //---populate the scope with the data returning from getUserProfile query.---
        vm.profileUser.photo = response.data.photo;
        vm.profileUser.location = response.data.location;
        // vm.profileUser.name = response.data.displayName;
        vm.profileUser.name = (response.data.username === vm.currentUser.username ? vm.currentUser.displayName : response.data.name);
        vm.profileUser.github = response.data.github;
        vm.profileUser.karmaPoints = response.data.karmaPoints;
        vm.profileUser.summary =	response.data.summary;
        vm.profileUser.displayName = response.data.displayName;
        response.data.toLearn.forEach(function(skill) {
          vm.skills.toLearn[skill] = true;
        });
        response.data.toTeach.forEach(function(skill) {
          vm.skills.toTeach[skill] = true;
        });
        vm.contentLoaded = true;
      });
    };

    vm.goToOtherUserProfile = function(username) {
      $location.path('profile/' + username);
    }; 

    vm.sendMessage = function(username) {
      $location.path('inbox');
    }; 
  }]);
})();
