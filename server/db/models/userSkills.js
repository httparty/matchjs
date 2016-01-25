'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserSkillJoin', {
    toLearn: {
      type: DataTypes.BOOLEAN
    },
    toTeach: {
      type: DataTypes.BOOLEAN
    }
  });
};