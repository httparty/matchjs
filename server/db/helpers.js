var db = require('./config.js');
var async = require('async');
var helpers = {};


//---------------AUTHENTICATION----------------------

helpers.deleteUser = function(userToDeleteObj) {
  db.User.findOne({
    where: {'username': userToDeleteObj.username}
  }).then(function(user) {
    return user.destroy();
  })  
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


//------------------GET USERS-------------------------

helpers.getAllUsers = function() {
  return db.User.findAll()
  .then(function(usersArray) {
    // var result = helpers.getRecommendations(usersArray, 'spiterman');
    //call 
    console.log('HERE ARE ALL USERS', usersArray);
    return usersArray;
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
      usersArray.splice(i);
    }
  }

  //we want to sort usersArray by comparing every elt to current_user and 
  //assigning some sort of ranking

  return [];
}
//get user obj with that username from db
//apply a filter to the list of all users based on some 
//property of that user obj

//filter by skills to teach
//some sort of intersection between arrays
//we'll rank you higher than someone who only has two

//api/users/username
// console.log(helpers.getAllUsers());

//--------------------FUNCTION TESTS
// db.Skill.bulkCreate([
// 	{	name: "AngularJS" },
// 	{ name: "JavaScript" },
// 	{ name: "Express"}
// 	]).then(function() {
// 		// return models.Skill.findAll();
// 	})

// db.User.create({
//     username: "Tom123",
//     name: "Tom Test",
//     password: "abc123",
//     email:"tom@tom.com",
//     phoneNumber: '415-222-3215'
//   }).then(function() {
//   });

// helpers.addMessage({
// 	username: "Tom123",
// 	recipientName: 'Rachel111',
// 	text: 'Oh hello friend. howz it?!'
// });

// helpers.updateUserSkills({
// 	username: 'Tom123',
// 	toLearn: ['AngularJS'],
// 	toTeach: ['JavaScript', 'Express']
// }).then(function() {
// 	console.log("hello success");
// });

helpers.seedDatabase = function() {

  var array = [1,2,3,4,5,6,7,8,9,10];

  async.each(array, function(i, next) {

      //query right here
      db.User.create({
        username: "user"+i,
        password: "password"+i,
        email: "user"+i+"@email.com",
        name: "user"+i,
        karmaPoints: Math.floor(Math.random() * 6)
        // toLearn: [],
        // toTeach: []
      }).then(function() {
        console.log("User successfully created");
        next();
      });

  }, function(err) {
    if (err) {
      console.log("An item failed to process");

    } else {
      console.log("successfully went through all of them");  
    }
  });
}


// helpers.seedDatabase();


// helpers.updateUserBasics({
// 	username: 'Rachel111',
// 	location: 'San Francisco',
// 	email: 'rachel@rachelCity.com',
// 	github: 'https://github.com/dearamerican',
// 	summary: 'Hello I am a programmer now, woot!',
// 	password: 'resetToSomethingHashedUp'
// }).then(function(user) {
// 	console.log("WOOT HERE IS USER", user);
// });
module.exports = helpers;
