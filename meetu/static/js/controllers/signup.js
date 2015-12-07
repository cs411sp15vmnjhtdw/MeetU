'use strict';

/**
 * @ngdoc function
 * @name meetUApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the meetUAppr
 */

angular.module('meetUApp')
  .controller('SignupCtrl', ['$scope', '$http', '$timeout', 'UniversityService', function ($scope, $http, $timeout, UniversityService) {

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

}]);