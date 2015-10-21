'use strict';

angular.module('meetUApp')
  .factory('UniversityService', function ($http) {
    var Universities= {
        getImage: function() {
            return $http.get('/universities').
              success(function(data) {
                return data;
              }).
              error(function(data, status) {
                console.log('Oh no! An error! Error status: ' + status);
              });
        }
    }
    return Universities;
});