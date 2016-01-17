'use strict';

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Message', {
		senderName: {
			type: DataTypes.STRING
		},
		recipientName: {
			type: DataTypes.STRING
		},
		recipientID: {
			type: DataTypes.INTEGER
		},
		text: {
			type: DataTypes.TEXT
		}
	});
};