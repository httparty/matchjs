var expect = require('chai').expect;
var search = require('../../search/search');

describe('Search', function(){

  it('getSearchResults is a function', function() {
    expect(search.getSearchResults).to.be.a("function");
  });

  it('in a single location query param, it returns all users by that location', function() {

    var queryParams = { locations: 'San Francisco' };
    var usersArray = [{dataValues: { username: 'polinadotio', location: 'San Francisco'}},
                      {dataValues: { username: 'dearamerican', location: 'Boston'}}];
    var result = search.getSearchResults(queryParams, usersArray);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0].dataValues.username).to.equal('polinadotio');
  });

  it('returns users by a skill', function() {
    var queryParams = { skills: 'AngularJS' };
    var usersArray = [{dataValues: { username: 'polinadotio', toTeach: [ 'Backbone', 'Express' ]}},
                      {dataValues: { username: 'dearamerican', toTeach: [ 'Express', 'AngularJS' ]}}];                  
    var result = search.getSearchResults(queryParams, usersArray);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0].dataValues.username).to.equal('dearamerican');
  });

  it('returns users by a name', function() {
    var queryParams = { names: 'Rachel Jenkins' };
    var usersArray = [{dataValues: { username: 'polinadotio', name: 'Polina Soshnin'}},
                      {dataValues: { username: 'dearamerican', name: 'Rachel Jenkins'}}];
    var result = search.getSearchResults(queryParams, usersArray);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0].dataValues.username).to.equal('dearamerican');
  });

  it('returns an empty array when no users fit the search query', function() {
    var queryParams = { names: 'Rachel Jenkins' };
    var usersArray = [{dataValues: { username: 'polinadotio', name: 'Polina Soshnin'}},
                      {dataValues: { username: 'dearamerican', name: 'Jenkins Rachel'}}];

    var result = search.getSearchResults(queryParams, usersArray);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(0);
  });

  it('in a multiple location query, it returns all users from those locations', function() {
    var queryParams = { locations: [ 'San Francisco', 'Boston' ] };
    var usersArray = [{dataValues: { username: 'polinadotio', location: 'San Francisco'}},
                      {dataValues: { username: 'dearamerican', location: 'Boston'}}];
    var result = search.getSearchResults(queryParams, usersArray);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0].dataValues.username).to.equal('polinadotio');
    expect(result[1].dataValues.username).to.equal('dearamerican');
  });

  it('in a multiple skills query, it returns all users with those skills', function() {
    var queryParams = { skills: [ 'AngularJS', 'Express' ] };
    var usersArray = [{dataValues: { username: 'polinadotio', toTeach: [ 'AngularJS', 'Backbone' ]}},
                      {dataValues: { username: 'dearamerican', toTeach: [ 'Node', 'Express' ]}}];                  
    var result = search.getSearchResults(queryParams, usersArray);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0].dataValues.username).to.equal('polinadotio');
    expect(result[1].dataValues.username).to.equal('dearamerican');
  });

  it('in a multiple users query, it returns all users with those skills', function() {
    var queryParams = { names: [ 'Polina Soshnin', 'Jenkins Rachel' ] };
    var usersArray = [{dataValues: { username: 'polinadotio', name: 'Polina Soshnin'}},
                      {dataValues: { username: 'dearamerican', name: 'Jenkins Rachel'}}];
    var result = search.getSearchResults(queryParams, usersArray);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0].dataValues.username).to.equal('polinadotio');
    expect(result[1].dataValues.username).to.equal('dearamerican');
  });

  it('in am empty query, all users are returned', function() {
    var queryParams = {};
    var usersArray = [{dataValues: { username: 'polinadotio', name: 'Polina Soshnin'}},
                      {dataValues: { username: 'dearamerican', name: 'Jenkins Rachel'}}];
    var result = search.getSearchResults(queryParams, usersArray);
    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
  });

  it('in a combined query, locations and skills return the AND of both', function() {
    var queryParams = { locations: 'San Francisco', skills: 'AngularJS' };
    var usersArray = [{dataValues: { username: 'polinadotio', toTeach: [ 'AngularJS', 'Backbone' ], location: 'San Francisco'}},
                      {dataValues: { username: 'dearamerican', toTeach: [ 'Node', 'Express' ], location: 'San Francisco'}}]; 
    var result = search.getSearchResults(queryParams, usersArray);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(1);
    expect(result[0].dataValues.username).to.equal('polinadotio');
  });

  it('in a combined query, order does not matter', function() {

    var queryParamsA = { locations: 'San Francisco', skills: 'AngularJS' };
    var queryParamsB = { skills: 'AngularJS', locations: 'San Francisco' };
    var usersArray = [{dataValues: { username: 'polinadotio', toTeach: [ 'AngularJS', 'Backbone' ], location: 'San Francisco'}},
                      {dataValues: { username: 'dearamerican', toTeach: [ 'Node', 'Express' ], location: 'San Francisco'}}]; 
    var resultA = search.getSearchResults(queryParamsA, usersArray);
    var resultB = search.getSearchResults(queryParamsB, usersArray);

    expect(resultA).to.be.an('array');
    expect(resultA.length).to.equal(1);
    expect(resultA[0].dataValues.username).to.equal('polinadotio');

    expect(resultB).to.be.an('array');
    expect(resultB.length).to.equal(1);
    expect(resultB[0].dataValues.username).to.equal('polinadotio');
  });

  it('in a combined query, names and skills return the AND of at least one name in the names query and one skill in the skills query', function() {
    var queryParams = { skills: ['AngularJS', 'React'], names: [ 'Polina Soshnin', 'Jenkins Rachel' ] };

    var usersArray = [{dataValues: { username: 'polinadotio', name: 'Polina Soshnin', toTeach: [ 'AngularJS', 'Backbone' ]}},
                      {dataValues: { username: 'dearamerican', name: 'Jenkins Rachel', toTeach: [ 'React', 'Node' ]}}];
    var result = search.getSearchResults(queryParams, usersArray); 

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0].dataValues.username).to.equal('polinadotio');
    expect(result[1].dataValues.username).to.equal('dearamerican');
  });

  it('in a combined query, locations and names return the AND of at least one name in the names query and one location in the locations query', function() {
     var queryParams = { locations: ['San Francisco', 'Boston'], names: [ 'Polina Soshnin', 'Jenkins Rachel' ] };
     var usersArray = [{dataValues: { username: 'polinadotio', name: 'Polina Soshnin', location: 'San Francisco'}},
                  {dataValues: { username: 'dearamerican', name: 'Jenkins Rachel', location: 'Boston'}}];
    var result = search.getSearchResults(queryParams, usersArray);
           
    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0].dataValues.username).to.equal('polinadotio');
    expect(result[1].dataValues.username).to.equal('dearamerican');
  });

  it('in a combined query, locations, names, and skills return the AND of an OR in each category', function() {
    var queryParams = { skills: ['AngularJS', 'React'], 
                        names: [ 'Polina Soshnin', 'Jenkins Rachel' ],
                        locations: ['San Francisco', 'Boston'] };

    var usersArray = [{dataValues: { username: 'user1', name: 'Polina Soshnin', toTeach: [ 'AngularJS', 'Backbone' ], location: 'Boston'}},
                      {dataValues: { username: 'user2', name: 'Jenkins Rachel', toTeach: [ 'React', 'Node' ], location: 'San Francisco'}},
                      {dataValues: { username: 'user3', name: 'Alice Wei', toTeach: [ 'Express', 'Node' ], location: 'Australia'}},
                      {dataValues: { username: 'user4', name: 'Alice Wei', toTeach: [ 'Gulp', 'HTML' ], location: 'San Francisco'}},
                      {dataValues: { username: 'user5', name: 'Alice Wei', toTeach: [ 'React', 'AngularJS' ], location: 'Alaska'}}];
    var result = search.getSearchResults(queryParams, usersArray);
    
    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0].dataValues.username).to.equal('user1');
    expect(result[1].dataValues.username).to.equal('user2');
  });

});