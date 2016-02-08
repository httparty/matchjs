'use strict';

var db = require('./config.js');
var rec = require('../recommender/recommend');
var helpers = {};

//---------------AUTHENTICATION----------------------

helpers.deleteUser = function(userToDeleteObj) {
  return db.User.findOne({
    where: {'username': userToDeleteObj.username}
  }).then(function(user) {
    if(!user){
      throw Error('Cannot locate user to delete.');
    }
    console.log('Line 16', user);
    return user.destroy();
  });
};

helpers.getUserByUserName = function(userObj) {
  return db.User.findOne({
    where: {'username': userObj.username}
  })
  .then(function(user) {
    if(user) {
      return user;
    }
  });
};

helpers.addUser = function(userObj) {
  return db.User.create({
    username: userObj.username,
    password: userObj.id,
    email: userObj._json.email,
    name: userObj.displayName,
    github: userObj.profileUrl,
    photo: userObj._json.avatar_url || '../../../client/assets/img/default-profile.png',
    location: userObj._json.location,
    karmaPoints: 0,
    toLearn: [],
    toTeach: [],
    wantFollowerEmails: true,
    wantInvitationEmails: true,
    wantChatEmails: true
  });
};

helpers.signInUser = function(userObj) {
  return db.User.findOne({
    where: {'username': userObj.username}
  }).then(function(user) {
    if(user) {
      return user;
    } else {
      return undefined;
    }
  });
};

//-----------------USER PROFILE--------------------------

helpers.updateUser = function(profileUpdateObj) {
  console.log(profileUpdateObj.wantEmails, 'Want emails on the update user function');
  return db.User.findOne({
  	where: {'username': profileUpdateObj.username}
  })
  .then(function(user) {
  	if(!user) {
  		throw Error('User not found.');
  	}
    return user.updateAttributes({
      location: profileUpdateObj.location || user.get('location'),
      name : profileUpdateObj.name || user.get('name'),
      email : profileUpdateObj.email || user.get('email'),
      password : profileUpdateObj.password || user.get('password'),
      phoneNumber : profileUpdateObj.phoneNumber || user.get('phoneNumber'),
      github: profileUpdateObj.github || user.get('github'),
      summary : profileUpdateObj.summary || user.get('summary'),
      photo : profileUpdateObj.photo || user.get('photo'),
      karmaPoints : profileUpdateObj.karmaPoints || user.get('karmaPoints'),
      toLearn: profileUpdateObj.toLearn || user.get('toLearn'),
      toTeach: profileUpdateObj.toTeach || user.get('toTeach'),
      wantFollowerEmails: typeof profileUpdateObj.wantFollowerEmails === 'boolean'? profileUpdateObj.wantFollowerEmails : user.get('wantFollowerEmails'),
      wantInvitationEmails: typeof profileUpdateObj.wantInvitationEmails === 'boolean'? profileUpdateObj.wantInvitationEmails : user.get('wantInvitationEmails'),
      wantChatEmails: typeof profileUpdateObj.wantChatEmails === 'boolean'? profileUpdateObj.wantChatEmails : user.get('wantChatEmails')
    });
  });
};

helpers.addPadawan = function(mentor, padawan) {
  return db.Padawan.create({
    mentorUsername: mentor,
    padawanUsername: padawan
  });
};

helpers.getPadawansByMentor = function(username) {
  return db.Padawan.findAll({
    where: {'mentorUsername': username}
  }).then(function(padawansArr) {
    if (!padawansArr) {
      return null;
    }
    return padawansArr;
  });
};

helpers.deletePadawan = function(mentor, padawan) {
  return db.Padawan.findOne({
    where: {'mentorUsername': mentor,
            'padawanUsername': padawan}
  }).then(function(padawanEntry) {
    return padawanEntry.destroy();
  });
};

helpers.getMentors = function(padawan) {
  return db.Padawan.findAll({
    where: {'padawanUsername': padawan}
  }).then(function(padawanRelArr) {
    return padawanRelArr;
  });
};

//------------------GET RECOMMENDED USERS-------------------------

// helper function for recommender
helpers.getAllUsersRec = function(username) {
  return db.User.findAll()
  .then(function(usersArray) {
    var result = rec.getRecommendations(usersArray, username);
    // console.log('HERE ARE ALL USERS', usersArray);
    return result;
  });
};

helpers.getUsersByLocation = function(location) {
  return db.User.findAll({
    where: {'location': location}
  }).then(function(users) {
    // console.log("users", users);
    if (!users) {
      return null;
    }
    return users;
  });
};

helpers.getAllUsers = function() {
  return db.User.findAll()
  .then(function(usersArray) {
    return usersArray;
  });
};

//------------------INVITATIONS-------------------------

helpers.createInvitation = function(username, invitee, sessionInfo){
  return db.User.findOne({
    where: {'username': username}
  }).then(function(user) {
    return db.Invitation.create({
      UserId: user.dataValues.id,
      senderName: user.get('username'),
      recipientName: invitee,
      when: sessionInfo.when,
      location: sessionInfo.where,
      summary: sessionInfo.summary,
    }).then(function(invitation) {
      return invitation;
    });
  });
};

helpers.getInvitationsBySender = function(username) {
  return db.User.findOne({
    where: {'username': username}
  }).then(function(user) {
    console.log('here is user! booooo', user);
    if(!user) {
      throw Error('Cannot locate user.');
    }
    return db.Invitation.findAll({
      where: {'senderName': username}
    }).then(function(invitations) {
      if (!invitations) {
        console.log('You have created no invitations');
        return null;
      }
      return invitations;
    });
  });
};

helpers.getInvitationsByRecipient = function(username) {
  return db.Invitation.findAll({
    where: {'recipientName': username}
  }).then(function(invitations) {
    if (!invitations) {
      return null;
    }
    return invitations;
  });
};

helpers.getInvitationById = function(inviteId) {
  return db.Invitation.findOne({
    where: {'id': inviteId}
  }).then(function(invite) {
    if (!invite) {
      return null;
    }
    return invite;
  });
};


helpers.updateInvitation = function(inviteObj) {
  return db.Invitation.findOne({
    where: {'id': inviteObj.id}
  }).then(function(invite) {
    if(!invite) {
      throw Error('Invitation not found.');
    }
    return invite.updateAttributes({
      'when': inviteObj.when || invite.get('when'),
      'location': inviteObj.location || invite.get('location')
    });
  });
};

helpers.deleteInvitation = function(inviteId) {
  return db.Invitation.findOne({
    where: {'id': inviteId}
  }).then(function(invite) {
    if(!invite) {
      throw Error('Invitation not found.');
    }
    return invite.destroy();
  });
};

module.exports = helpers;