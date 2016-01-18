'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('User', {
		username: {
			type: DataTypes.STRING
		},
		name: {
			type: DataTypes.STRING
		},
		password: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		photo: {
			type: DataTypes.STRING
		},
		github: {
			type: DataTypes.STRING
		},
		location: {
			type: DataTypes.STRING
		},
		karmaPoints: {
			type: DataTypes.INTEGER
		}
	});
};
