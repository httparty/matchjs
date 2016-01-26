var _ = require('underscore');
var rank = {};

exports.getRecommendations = function(usersArray, username) {

  var currentUser = {};

  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].dataValues.username === username) {
      currentUser = usersArray[i].dataValues;
      usersArray.splice(i, 1);
    }
  };

  //populate rank object with appropriate ranks
  generateToTeachRank(currentUser, usersArray);
  generateKarmaRank(currentUser, usersArray);

  //sort usersArray based on rank number in rank object
  usersArray.sort(function(a, b){
    return rank[b.dataValues.username] - rank[a.dataValues.username];
  });

  //test to make sure rank sorting is happening correctly
  _.each(usersArray, function(user) {
    console.log("USER", user.dataValues.username, rank[user.dataValues.username]);
  })

  //return top 6 recommended users
  return usersArray.slice(0,6);
};

/*************************************************************
Generates a value that represents the number of skills
a user is willing to teach that the current user would like
to learn
**************************************************************/

var generateToTeachRank = function(currentUser, usersArray) {

  _.each(usersArray, function(user){
    var teachRank = _.intersection(currentUser.toLearn, user.dataValues.toTeach).length;
    rank[user.dataValues.username] = (rank[user.dataValues.username] || 0)  + teachRank;
  });
  // console.log("RANK", rank);
};

/*************************************************************
Generates the total karma points for a user
**************************************************************/

var generateKarmaRank = function(currentUser, usersArray) {

  _.each(usersArray, function(user){
    var karmaRank = user.dataValues.karmaPoints;
    rank[user.dataValues.username] = (rank[user.dataValues.username] || 0)  + karmaRank;
  });
  // console.log("RANK", rank);
};

/*************************************************************
Generates a vluae that represents the number of skills
a user would like to learn that the current user would
also like to learn
**************************************************************/

var generateToLearnRank = function(currentUser, usersArray) {

}

/*************************************************************
Write additional generate rank functions here!

Remember to use this syntax:
rank[user.dataValues.username] = (rank[user.dataValues.username] || 0)  + rank;

This populates starting rank with 0 if no rank has been supplied yet.

This will be necessary when we add in logic that skips over ranks.
**************************************************************/