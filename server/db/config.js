require('dotenv').load();
var Sequelize = require('sequelize');
var User = require('./models/users.js');
var Skill = require('./models/skills.js');
var Message = require('./models/messages.js');
var UserSkillJoin = require('./models/userSkills.js');

var sequelize = new Sequelize(process.env.DATABASE_URL); //Uncomment for real deployment

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

var models = {};

models.User = new User(sequelize, Sequelize);
models.Skill = new Skill(sequelize, Sequelize);
models.Message = new Message(sequelize, Sequelize);
models.UserSkillJoin = new UserSkillJoin(sequelize, Sequelize);

models.User.hasMany(models.Message);
//Because of this ^, Message model contains UserId
models.Skill.belongsToMany(models.User, {through: 'UserSkillJoin'});
models.User.belongsToMany(models.Skill, {through: 'UserSkillJoin'});

models.User.sync({force: false}).then(function(){
	console.log('User table created!');
	// return models.User.create({
 //    username: "Tom123",
 //    name: "Tom Test",
 //    password: "abc123",
 //    email:"tom@tom.com"
 //    // phone: 415-222-3215
 //  });

});

models.Skill.sync({force: false}).then(function(){
	console.log('Skill table created!');
	// models.Skill.bulkCreate([
	// {	name: "AngularJS" },
	// { name: "JavaScript" },
	// { name: "Express"}
	// ]).then(function() {
	// 	return models.Skill.findAll();
	// }).then(function(skillsArr) {
	// 	// console.log(skillsArr);
	// })
});

models.Message.sync({force: false}).then(function(){
	console.log('Message table created!');
});

models.UserSkillJoin.sync({force: false}).then(function(){
	console.log('UserSkillJoin table created!');
});

module.exports = models;
