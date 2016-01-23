var db = require('./config.js');

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


helpers.updateUserBasics = function(profileUpdateObj) {
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
    console.log('HERE ARE ALL USERS', usersArray);
    return usersArray;
  });
};

//more functions need to be written here for the recommender



module.exports = helpers;

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

// helpers.signupUser({
// 	username: 'Rachel111',
// 	password: 'somecrazyhashedupthing',
// 	email: 'rachel@rachel.com',
// 	phoneNumber: '4152141234'
// }).then(function(user){
// 	console.log('success! here is user', user);
// });

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
