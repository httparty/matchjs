'use strict';

module.exports = function(sequelize, DataType) {
  return sequelize.define('Invitation', {
    recipientName: {
      type: DataType.STRING
    },
    senderName: {
      type: DataType.STRING
    },
    when: {
      type: DataType.DATE
    },
    location: {
      type: DataType.STRING
    },
    summary: {
      type: DataType.TEXT
    }
  });
};