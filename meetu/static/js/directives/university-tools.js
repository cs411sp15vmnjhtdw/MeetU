'use strict';

angular.module('meetUApp')
.directive('universityTools',['$http', function ($http) {
    return {
        restrict : 'EA',
        templateUrl: "/static/views/university/_university_tools.html",  
        link: function(scope) {
            scope.getUniversities();

            $("#university-insert-submit").on("click", function() {
                var newUniversity = {
                    name: $("#university-insert-input-name").val(),
                    city: $("#university-insert-input-city").val(),
                    state: $("#university-insert-input-state").val(),
                }

                $http({
                    method: 'POST',
                    url: '/universities/',
                    data: $.param(newUniversity),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).success(function(data) {
                        scope.getUniversities();
                        console.log("Success creating new entry!");
                        console.log(data);
                }).error(function(data) {
                        console.log('Oh no! An error! Error status: ' + status);
                        console.log(data);
                });

            });


            scope.deleteUniversity = function(universityId) {
                $http({
                    method: 'DELETE',
                    url: '/universities/' + universityId,
                    // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).success(function(data) {
                        scope.getUniversities();
                        console.log("Success deleting an entry!");
                        console.log(data);
                }).error(function(data) {
                        console.log('Oh no! An error! Error status: ' + status);
                        console.log(data);
                });
            }

        }
    };
}]);