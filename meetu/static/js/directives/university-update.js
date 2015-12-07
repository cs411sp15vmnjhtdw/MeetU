'use strict';

angular.module('meetUApp')
.directive('universityUpdate',['$http', function ($http) {
    return {
        restrict : 'EA',
        templateUrl: "/static/views/university/_university_update.html",  
        link: function(scope) {

            $("#university-update-submit").on("click", function() {
                var updateUniversity = {
                    name: $("#university-update-input-name").val(),
                    city: $("#university-update-input-city").val(),
                    state: $("#university-update-input-state").val(),
                }

                $http({
                    method: 'PUT',
                    url: '/universities/' + scope.updateUniversityId,
                    data: $.param(updateUniversity),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                }).success(function(data) {
                        console.log("Success updating entry!");
                        console.log(data);
                }).error(function(data) {
                        console.log('Oh no! An error! Error status: ' + status);
                        console.log(data);
                });

            });

        }
    };
}]);