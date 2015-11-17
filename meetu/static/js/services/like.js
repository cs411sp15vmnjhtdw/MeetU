'use strict';

angular.module('meetUApp')
  .factory('LikeService', function ($http) {
    var Likees = {
      getLikees: function() {
        return $http.get('/likes')
                .success( function(data) {
                  return data;
                })
                .error(function(data, status) {
                  console.log('Oh no! An error! Error status: ' + status);
                });
      }
    }
    return Likees;
});