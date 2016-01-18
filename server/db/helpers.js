var db = require('./config.js');

var helpers = {};

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
				name: userDataObj.name,
				github: userDataObj.github,
				photo: userDataObj.photo,
				karmaPoints: 0
			})
		}
	})
};


//-----------------USER PROFILE--------------------------

helpers.updateUserBasics = function(profileUpdateObj) {
	return db.User.findOne({
		where: {'username': profileUpdateObj.username}
	})
	.then(function(user) {
		return user.updateAttributes({
	  	location: profileUpdateObj.location || user.get('location'),
	  	name : profileUpdateObj.name || user.get('name'),
	  	email : profileUpdateObj.email || user.get('email'),
	  	password : profileUpdateObj.email || user.get('password'),
	  	phone : profileUpdateObj.phone || user.get('phone'),
	  	github: profileUpdateObj.github || user.get('github'),
	  	summary : profileUpdateObj.summary || user.get('summary')
		});
	})
};

//NOTE TO RACHEL:
//I think this is wrong because I'm not using the built in methods for the join table 
// "This will add methods getUsers, setUsers, addUser,addUsers to Project, and getProjects, setProjects and addProject, addProjects to User."

helpers.updateUserSkills = function(profileUpdateObj) {
return db.User.findOne({
		where: { 'username': profileUpdateObj.username }
	})
	.then(function(user) {
		return db.Skills.findAll({
			where: { 'name': profileUpdateObj.toLearn }
		}).then(function(learningSkillsArray) {
			learningSkillsArray.forEach(function(skill) {
				skill.toLearn = true
			})
		}).then(function() {
			return db.Skills.findAll({
				where: { 'name': profileUpdateObj.toTeach }
			}).then(function(teachingSkillsArray) {
				teachingSkillsArray.forEach(function(skill) {
					skill.toTeach = false
				})
			})
		})
	})
};


//------------------Messages--------------------------
helpers.addMessage = function(messageObj) {

};


