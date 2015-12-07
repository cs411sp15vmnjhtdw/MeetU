'use strict';

/**
 * @ngdoc function
 * @name meetUApp.controller:MatchCtrl
 * @description
 * # MatchCtrl
 * Controller of the meetUApp
 */
angular.module('meetUApp')
  .controller('MatchCtrl', function ($scope, $http, $routeParams, MatchService) {
    
      MatchService.getMatch()
      .then(
        //success function
        function (asyncImageData) {
            // console.log(asyncImageData.data);
            $scope.matches = asyncImageData.data.data;
            console.log($scope.matches);
          },
        //error function
        function(result) {
            console.log(result);
          console.log("Failed to get the matches, result is " + result.toString()); 
        });
    

  });