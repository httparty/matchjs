var db = require('./config.js');
var rec = require('../recommender/recommend');
var helpers = {};

//---------------AUTHENTICATION---------------------- 

helpers.deleteUser = function(userToDeleteObj) {
  db.User.findOne({
    where: {'username': userToDeleteObj.username}
  }).then(function(user) {
    return user.destroy();
  });
};

helpers.getUserByUserName = function(userObj) {
  return db.User.findOne({
    where: {'username': userObj.username}
  })
  .then(function(user) {
    if(!user) {
      throw Error('Cannot locate user.');
    }
    return user;
  });
};

helpers.signupUser = function(userObj) {
  return db.User.findOne({
    where: {'username': userObj.username}
  }).then(function(user) {
    if(user) {
      return user;
    } else {
      return db.User.create({
        username: userObj.username,
        password: userObj.id,
        email: userObj._json.email || userObj.username + '@users.noreply.github.com',
        name: userObj.displayName,
        github: userObj.profileUrl,
        photo: userObj._json.avatar_url,
        location: userObj._json.location,
        karmaPoints: 0,
        toLearn: [],
        toTeach: []
      });
    }
  });
};

//-----------------USER PROFILE--------------------------

helpers.updateUser = function(profileUpdateObj) {
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
      toTeach: profileUpdateObj.toTeach || user.get('toTeach')
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
    where: {'mentorName': username}
  }).then(function(padawansArr) {
    // console.log("padawans", padawansArr);
    if (!padawansArr) {
      return null;
    }
    return padawans;
  });
};

helpers.deletePadawan = function(mentor, padawan) {
  return db.Padawan.findOne({
    where: {'mentorUsername': mentor,
            'padawanUsername': padawan}
  }).then(function(padawanEntry) {
    return padawanEntry.destroy();
  })
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

// var sessionInfo = {
//   when: new Date(),
//   where:'San Francisco',
//   summary: 'AngularJS'
// };

// helpers.createInvitation('dearamerican','polinadotio',sessionInfo);

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
      // console.log(invitation);
      return invitation;
    });
  });
};

// helpers.getInvitationsBySender('polinadotio');
helpers.getInvitationsBySender = function(username) {
  return db.User.findOne({
    where: {'username': username}
  }).then(function(user) {
    if(!user) {
      throw Error('Cannot locate user.');
    }
    return db.Invitation.findAll({
      where: {'UserId': user.dataValues.id}
    }).then(function(invitations) {
      if (!invitations) {
        console.log('You have created no invitations');
        return null;
      }
      return invitations;
    });
  });
};

// helpers.getInvitationsByRecipient('dearamerican');
helpers.getInvitationsByRecipient = function(username) {
  return db.Invitation.findAll({
    where: {'recipientName': username}
  }).then(function(invitations) {
    // console.log("invitations", invitations);
    if (!invitations) {
      return null;
    }
    return invitations;
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