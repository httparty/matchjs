var _ = require('underscore');

exports.getRecommendations = function(usersArray, username) {
  //get the object with the current user and take it out
  //of the usersArray
  console.log("HeY YOOOOOOO");
  var current_user = {};
  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].dataValues.username === username) {
      current_user = usersArray[i].dataValues;
      usersArray.splice(i, 1);
    }
  }

  usersArray.sort(function(a, b){
    return b.dataValues.karmaPoints - a.dataValues.karmaPoints;
  });
  
  usersArray.forEach(function(item){
    console.log(item.dataValues.karmaPoints, item.dataValues.username);
  });

  // console.log(usersArray);
  //we want to sort usersArray by comparing every elt to current_user and
  //assigning some sort of ranking

  return usersArray;
};