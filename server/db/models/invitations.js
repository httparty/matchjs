'use strict';

module.exports = function(sequelize, DataType) {
  return sequelize.define('Invitation', {
    recipientName: {
      type: DataType.STRING
    },
    when: {
      type: DataType.STRING
    },
    where: {
      type: DataType.DATE
    },
    summary: {
      type: DataType.TEXT
    }
  });
};