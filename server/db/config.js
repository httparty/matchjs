'use strict';

require('dotenv').config();
var Sequelize = require('sequelize');
var User = require('./models/users.js');
var Message = require('./models/messages.js');
var Invitation = require('./models/invitations.js');
var Padawan = require('./models/padawans.js');

var sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  }, function (err) {
    console.log('Unable to connect to the database:', err);
  });

var models = {};

models.User = new User(sequelize, Sequelize);
models.Invitation = new Invitation(sequelize, Sequelize);
models.Padawan = new Padawan(sequelize, Sequelize);

models.User.hasMany(models.Invitation);
models.User.hasMany(models.Padawan);

/*************************************************************
Sync with Postgres
If force is set to true, database tables will be dropped.
**************************************************************/

models.User.sync({force: false}).then(function(){
	console.log('User table created!');
});

models.Invitation.sync({force: false}).then(function(){
  console.log('Invitation table created!');
});

models.Padawan.sync({force: false}).then(function() {
  console.log('Padawan table created!');
});

module.exports = models;