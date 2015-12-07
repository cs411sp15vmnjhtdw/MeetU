'use strict';

angular.module('meetUApp')
.directive('authenticationForm',['$http', '$location', function ($http, $location) {
    return {
        restrict : 'EA',
        templateUrl: "/static/views/authentication-form.html",  
        link: function(scope) {

            var loginOrSignup = function(isLogin) {
                return function() {
                    var credentials = {
                                username: $("#email-user").val(),
                                password: $("#password-user").val()
                                };
                    $http({
                          method: 'POST',
                          url: '/students/auth/',
                          data: $.param(credentials),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                      }).success(function(data, user) {
                              console.log("Success sign in or sign up!");
                              console.log(data);
                              console.log(user);
                              $location.path('/like');
                      }).error(function(data) {
                              console.log('Oh no! An error! Error status: ' + status);
                              console.log(data);
                      });
                  }
            }

            $("#login-button").on("click", loginOrSignup(true));

        }
    };
}]);