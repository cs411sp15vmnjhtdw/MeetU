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

      $http({
              method: 'GET',
              url: '/students/auth/',
          }).success(function(data) {
                  console.log("Success getting current user!");
                  console.log(data);
                  $scope.currentUserId = 1;
          }).error(function(data) {
                  console.log('Oh no! An error! Error status: ' + status);
                  console.log(data);
          });

      function getAge(dateString) 
      {
          var today = new Date();
          var birthDate = new Date(dateString);
          var age = today.getFullYear() - birthDate.getFullYear();
          var m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
          {
              age--;
          }
          return age;
      }

      $scope.isRecommendationExist = false;

    
     $scope.getLikees = function() {
      LikeService.getLikees()
      .then(
        //success function
        function (asyncImageData) {
          // console.log(asyncImageData);
            $scope.likees = asyncImageData.data.data || [];
            $scope.currentLikeeIndex = 0;
            $scope.likees.forEach(function(likee) {
              likee.age = getAge(likee.birthdate);
              console.log(likee.age);
            })
            if ($scope.likees.length < 1) {
              $scope.isRecommendationExist = false;
              console.log("no more people to be liked!");
            }
            else {
              $scope.isRecommendationExist = true;
              console.log("more people to be liked!");
            }
          },
        //error function
        function(result) {
          console.log("Failed to get the image, result is " + result.toString()); 
        });
    };
    

  });