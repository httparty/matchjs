'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    username: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        len: [10,13]
      }
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
    summary: {
      type: DataTypes.TEXT
    },
    toLearn: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    toTeach: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    wantEmails: {
      type: DataTypes.BOOLEAN
    }
  });
};
