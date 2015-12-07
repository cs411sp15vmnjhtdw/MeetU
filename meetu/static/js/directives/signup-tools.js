'use strict';

angular.module('meetUApp')
.directive('signupTools',['$http', '$location', function ($http, $location) {
    return {
        restrict : 'EA',
        templateUrl: "/static/views/signup/_signup.html",  
        link: function(scope) {
            scope.getUniversities();

            var isValidPhoto = false;

            var checkInput = function(user) {
              return user.first_name && user.last_name && user.birthdate && user.email_domain && user.gender && 
                      user.username && user.password && isValidPhoto; 
            }


            scope.signup = function(user) {
              // var form_data = new FormData();

              // for ( var key in user ) {
              //   console.log(user[key]);
              //     form_data.append(key, user[key]);
              // }

              // console.log(form_data);

              upload();
              if (checkInput(user)) {
                user.birthdate = new Date(user.birthdate);
                console.log(user);
                $http({
                          method: 'POST',
                          url: '/students/',
                          data: $.param(user),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                      }).success(function(data) {
                              alert("Success signing up! Please sign in with your email and password!");
                              $location.path('/');
                      }).error(function(data, status) {
                              console.log('Oh no! An error! Error status: ' + status);
                              // console.log(data);
                });
              }
              else {
                alert("please fill in all input fields and upload a photo with just you in it")
              }
            };

             var upload = function() {
              $('#cropped-image-signup').faceCount({
                  complete: function (faces) {
                    console.log(faces.validPhoto);

                    if (!isValidPhoto) {
                      alert(faces.message);
                    }

                    isValidPhoto = faces.validPhoto;

                  }
              });

            }

        }
    };
}]);