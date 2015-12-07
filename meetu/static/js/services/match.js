'use strict';

angular.module('meetUApp')
  .factory('MatchService', function ($http) {
    var Matches= {
        getMatch: function() {
            return $http.get('/matches')
              .success(function(data) {
                console.log("matches");
                console.log(data);
                return data;
              })
              .error(function(data, status) {
                console.log('Oh no! An error! Error status: ' + status);
              });
        }
    }
    return Matches;
});