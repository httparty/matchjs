var db = require('./config.js');
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


//------------------GET RECOMMENDED USERS-------------------------

helpers.getAllUsers = function(username) {
  return db.User.findAll()
  .then(function(usersArray) {
    var result = helpers.getRecommendations(usersArray, username);
    // console.log('HERE ARE ALL USERS', usersArray);
    return result;
  });
};

//more functions need to be written here for the recommender

helpers.getRecommendations = function(usersArray, username) {
  //get the object with the current user and take it out
  //of the usersArray
  var current_user = {};
  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].dataValues.username === username) {
      current_user = usersArray[i].dataValues;
      usersArray.splice(i, 1);
    }
  }

  usersArray.sort(function(a, b){
    return b.dataValues.karmaPoints - a.dataValues.karmaPoints;
  });
  usersArray.forEach(function(item){
    console.log(item.dataValues.karmaPoints, item.dataValues.username);
  });

  // console.log(usersArray);
  //we want to sort usersArray by comparing every elt to current_user and
  //assigning some sort of ranking

  return usersArray;
};

module.exports = helpers;