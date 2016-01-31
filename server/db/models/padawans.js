'use strict';

module.exports = function(sequelize, DataType) {
  return sequelize.define('Padawan', {
    mentorUsername: {
      type: DataType.STRING
    },
    padawanUsername: {
      type: DataType.STRING
    }
  });
};