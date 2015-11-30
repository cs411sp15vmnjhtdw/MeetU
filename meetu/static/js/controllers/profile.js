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
    $scope.upload = function (dataUrl) {
        Upload.upload({
            url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        });
    }

    $scope.update = function(user) {
        console.log(user);
        $http({
                  method: 'POST',
                  url: '/user/',
                  data: $.param(user),
                  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              }).success(function(data) {
                      console.log("Success updating profile!");
                      console.log(data);
              }).error(function(data) {
                      console.log('Oh no! An error! Error status: ' + status);
                      console.log(data);
              });
    };
}]);