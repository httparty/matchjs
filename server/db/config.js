var Sequelize = require('sequelize');
var User = require('./models/users.js');
var Skill = require('./models/skills.js');
var Message = require('./models/messages.js');
var UserSkillJoin = require('./models/userSkills.js');

// // var sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
// // 	host: 'localhost',
// // 	dialect: 'postgres',
// // 	port: 5432
// // });

// var sequelize = new Sequelize(process.env.DATABASE_URL); //Uncomment for real deployment

var sequelize = new Sequelize("postgres://psoshnin:RIPmatchr28@postgres-match-dev.co6f9ijf2gka.us-west-2.rds.amazonaws.com:5432/matchjs"); //Comment out when actually deploying

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

var models = {};
models.User = User(sequelize, Sequelize);
models.Skill = Skill(sequelize, Sequelize);
models.Message = Message(sequelize, Sequelize);
models.UserSkillJoin = UserSkillJoin(sequelize, Sequelize);

models.User.hasMany(models.Message);
models.Skill.belongsToMany(models.User, {through: 'UserSkillJoin'});
models.User.belongsToMany(models.Skill, {through: 'UserSkillJoin'});

models.User.sync({force: false}).then(function(){
	console.log('User table created!');
});

models.Skill.sync({force: false}).then(function(){
	console.log('Skill table created!');
});

models.Message.sync({force: false}).then(function(){
	console.log('Message table created!');
});

models.UserSkillJoin.sync({force: false}).then(function(){
	console.log('UserSkillJoin table created!');
});

module.exports = models;
