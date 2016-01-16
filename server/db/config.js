var Sequelize = require('sequelize');
var sequelize = new Sequelize('matchjs', 'matchjsteam', 'RIPmatchr', {
	host: 'localhost',
	dialect: 'postgres',
	port: 5432,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});