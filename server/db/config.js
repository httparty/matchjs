var Sequelize = require('sequelize');
// // var sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
// // 	host: 'localhost',
// // 	dialect: 'postgres',
// // 	port: 5432
// // });
var sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

var models = {};
models.User = sequelize.define('User', {
	username: {
		type: Sequelize.STRING
	},
	name: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	phoneNumber: {
		type: Sequelize.INTEGER
	},
	photo: {
		type: Sequelize.STRING
	},
	github: {
		type: Sequelize.STRING
	},
	location: {
		type: Sequelize.STRING
	},
	summary: {
		type: Sequelize.TEXT
	},
	karmaPoints: {
		type: Sequelize.INTEGER
	}
});

models.Skill = sequelize.define('Skill', {
	name: {
		type: Sequelize.STRING
	}
});

models.Message = sequelize.define('Message', {
	senderName: {
		type: Sequelize.STRING
	},
	recipientName: {
		type: Sequelize.STRING
	},
	recipientID: {
		type: Sequelize.INTEGER
	},
	text: {
		type: Sequelize.TEXT
	}
});

models.UserSkillJoin = sequelize.define('UserSkillJoin', {
	toLearn: {
		type: Sequelize.BOOLEAN
	},
	toTeach: {
		type: Sequelize.BOOLEAN
	}
});

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