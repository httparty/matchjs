var _ = require('underscore');

exports.getSearchResults = function(queryParams, usersArray) {

  // console.log(queryParams);

  var result = usersArray;

  if (!_.isEmpty(queryParams)) {

    if (queryParams.locations) {

      if (typeof queryParams.locations === 'string') {
        queryParams.locations = [queryParams.locations];
      }

      result = _.filter(result, function(item) {
        return _.contains(queryParams.locations, item.dataValues.location);
      });
      // console.log("has some locations");

    }

    if (queryParams.skills) {
      // console.log("only skills");

      if (typeof queryParams.skills === 'string') {
        queryParams.skills = [queryParams.skills];
      }

      result = _.filter(result, function(item) {
        return _.intersection(queryParams.skills, item.dataValues.toTeach).length > 0;
      });

      // _.each(result, function(item) {
      //   console.log(item.dataValues.toTeach)
      // });

      // _.each(result, function(item) {
      //   console.log("check", _.intersection(req.query.skills, item.dataValues.toTeach));
      // })
    }
    return result;

  } else {
    return result;
  }

};