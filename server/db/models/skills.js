'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Skill', {
    name: {
    type: DataTypes.STRING
    }
  });
};