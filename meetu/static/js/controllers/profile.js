'use strict';

/**
 * @ngdoc function
 * @name meetUApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the meetUAppr
 */

angular.module('meetUApp')
  .controller('ProfileCtrl', ['$scope', '$http', 'Upload', '$timeout', function ($scope, $http, Upload, $timeout) {

     $http({
          method: 'GET',
          url: '/students/auth/',
      }).success(function(response) {
              console.log("Success getting user!");
              var user = response.data;
              console.log(user);
              var date = new Date(user.birthdate);
              date = (date.getMonth() + 1) + '/' + (date.getDate() + 1) + '/' +  date.getFullYear();
              user.birthdate = new Date(date);
              if (user.gender) {
                $("#male-gender").prop('checked',true);
              }
              else {
                $("#female-gender").prop('checked', true);
              }

              if (user.gender_preference) {
                $("#male-pref").prop('checked', true);
              }
              else {
                $("#female-pref").prop('checked', true);
              }
              // var dateArr = []
              // dateArr[2] = user.birthdate.split("-")[0];
              // dateArr[0] = user.birthdate.split("-")[1];
              // dateArr[1] = user.birthdate.split("-")[2];
              // user.birthdate = dateArr.join("/");
              $scope.user = user;
      }).error(function(data) {
              console.log('Oh no! An error! Error status: ' + status);
              console.log(data);
      });


    $scope.update = function(user) {
        console.log(user);
        $http({
                  method: 'POST',
                  url: '/students/update',
                  data: $.param(user),
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              }).success(function(data) {
                      alert("Success updating profile!");
                      console.log(data);
              }).error(function(data) {
                      alert("Something went wrong! Please fill in all input fields.");
                      console.log('Oh no! An error! Error status: ' + status);
                      console.log(data);
              });
    };

}]);