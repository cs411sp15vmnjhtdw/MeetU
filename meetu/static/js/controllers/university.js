'use strict';

/**
 * @ngdoc function
 * @name meetUApp.controller:UniversityCtrl
 * @description
 * # UniversityCtrl
 * Controller of the meetUApp
 */
angular.module('meetUApp')
  .controller('UniversityCtrl', function ($scope, $http, $routeParams, UniversityService) {
    
    $scope.updateUniversityId = $routeParams.universityid;

    $scope.getUniversities = function() {
      UniversityService.getImage()
      .then(
        //success function
        function (asyncImageData) {
            // console.log(asyncImageData.data);
            $scope.universities = asyncImageData.data;
          },
        //error function
        function(result) {
          console.log("Failed to get the image, result is " + result.toString()); 
        });
    };
    

  });