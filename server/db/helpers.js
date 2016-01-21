var db = require('./config.js');

var helpers = {};


//---------------AUTHENTICATION----------------------

helpers.signupUser = function(userDataObj) {
	return db.User.findOne({
		where: {'username': userDataObj.username}
	})
	.then(function(user) {
		if(user) {
			throw Error('Username already taken!');
		}
		else {
			return db.User.create({
				username: userDataObj.username,
				password: userDataObj.password,
				email: userDataObj.email,
				phoneNumber: userDataObj.phoneNumber,
				name: userDataObj.name,
				github: userDataObj.github,
				photo: userDataObj.photo,
				karmaPoints: 0
			})
		}
	})
};

helpers.deleteUser = function(userToDeleteObj) {
	db.User.findOne({ 
		where: {'username': userToDeleteObj.username}
	}).then(function(user) {
  	return user.destroy();
	})
	.then(function() {})
};

helpers.getUserByUserName = function(userObj) {
  return db.User.findOne({
    where: {'username': userObj.username}
	})
  .then(function(user) {
  	if(!user) {
			throw Error('Cannot locate user.');
		}
		else {
  		return user;
  	}
	})
};


//-----------------USER PROFILE--------------------------


helpers.updateUserBasics = function(profileUpdateObj) {
	return db.User.findOne({
		where: {'username': profileUpdateObj.username}
	})
	.then(function(user) {
		if(!user) {
			throw Error('User not found.')
		}
		return user.updateAttributes({
		  	location: profileUpdateObj.location || user.get('location'),
		  	name : profileUpdateObj.name || user.get('name'),
		  	email : profileUpdateObj.email || user.get('email'),
		  	password : profileUpdateObj.password || user.get('password'),
		  	phoneNumber : profileUpdateObj.phoneNumber || user.get('phoneNumber'),
		  	github: profileUpdateObj.github || user.get('github'),
		  	summary : profileUpdateObj.summary || user.get('summary'),
		  	photo : profileUpdateObj.photo || user.get('photo')
		});
	})
};

helpers.updateUserSkills = function(profileUpdateObj) {
return db.User.findOne({
		where: { 'username': profileUpdateObj.username }
	})
	.then(function(user) {
		if(!user) {
			throw Error('User not found.')
		}
		return db.Skill.findAll()
		.then(function(allSkillsArray) {
			console.log("INSIDE DB.SKILL.FINDALL", allSkillsArray);
			return allSkillsArray.forEach(function(skill) {
				skill.addUser(user, { toTeach: false, toLearn: false });
			})
		})
		.then(function() {
			return db.Skill.findAll({
				where: {'name': profileUpdateObj.toLearn}
			})
			.then(function(skillsArrayToLearn) {
				return skillsArrayToLearn.forEach(function(skill) {
					skill.addUser(user, { toLearn: true });
				})
			})
		})
		.then(function() {
			return db.Skill.findAll({
				where:{'name': profileUpdateObj.toTeach}
			})
			.then(function(skillsArraytoTeach) {
				return skillsArraytoTeach.forEach(function(skill) {
					skill.addUser(user, { toTeach: true });
				})
			})
		})
	})
};


//------------------GET USERS-------------------------

helpers.getAllUsers = function() {
	return db.User.findAll()
	.then(function(usersArray) {
		console.log('HERE ARE ALL USERS', usersArray);
		return usersArray;
	})
};

//more functions need to be written here for the recommender


//------------------Messages--------------------------


helpers.addMessage = function(messageObj) {
	var recipientID;
	return db.User.findOne({
		where: {'username': messageObj.recipientName}
	})
	.then(function(recipient) {
		recipientID = recipient.get('id');
			return db.User.findOne({
				where: {'username': messageObj.username}
			}).then(function(sender) {
				var senderID = sender.get('id');
				return db.Message.create({
					'senderName': messageObj.username,
					'recipientName': messageObj.recipientName,
					'recipientID': recipientID,
					'text': messageObj.text,
					'UserId': senderID
				})
			})
	})
};

helpers.getMessageHistory = function(messageDataObj) {
	// var recipientID;
	// return db.User.findOne({
	// 	where: {'username': messageDataObj.recipientName}
	// })
	// .then(function(recipient) {
	// 	recipientID = recipient.get('id');
	// 		return db.User.findOne({
	// 			where: {'username': messageDataObj.username}
	// 		}).then(function(sender) {
	// 			senderID = sender.get('id');
	// 			return db.Message.create({
	// 				'senderName': messageDataObj.username,
	// 				'recipientName': messageDataObj.recipientName,
	// 				'recipientID': recipientID,
	// 				'text': messageDataObj.text,
	// 				'UserId': senderID
	// 			})
	// 		})
	// })
};

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
