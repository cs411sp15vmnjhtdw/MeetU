'use strict';

/**
 * @ngdoc function
 * @name meetUApp.controller:LikeCtrl
 * @description
 * # LikeCtrl
 * Controller of the meetUAppr
 */
angular.module('meetUApp')
  .controller('LikeCtrl', function ($scope, $http, $routeParams, LikeService) {
    
     $scope.getLikees = function() {
      LikeService.getLikees()
      .then(
        //success function
        function (asyncImageData) {
            // console.log(asyncImageData.data);
            $scope.likees = asyncImageData.data;
            $scope.currentLikeeIndex = 0;
          },
        //error function
        function(result) {
          console.log("Failed to get the image, result is " + result.toString()); 
        });
    };
    

  });