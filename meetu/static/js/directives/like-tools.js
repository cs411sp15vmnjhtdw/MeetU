'use strict';

angular.module('meetUApp')
.directive('likeTools',['$http', function ($http) {
    return {
        restrict : 'EA',
        templateUrl: "static/views/like/_like_tools.html",  
        link: function(scope) {

            var newLike,
                newDislike,
                postNewLike;

            scope.getLikees();

            postNewLike = function(isLiked) {
                return function() {
                    newLike = {
                            liker: "me",
                            likee: scope.likees[scope.currentLikeeIndex].id,
                            like: isLiked
                        }
                    $http({
                            method: 'POST',
                            url: '/likes/',
                            data: $.param(newLike),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        }).success(function(data) {
                                scope.getUniversities();
                                scope.currentLikeeIndex++;
                                if (currentLikeeIndex === likees.length) {
                                    scope.currentLikeeIndex = 0;
                                    scope.getLikees;
                                }
                                console.log("Success creating new entry!");
                                console.log(data);
                        }).error(function(data) {
                                console.log('Oh no! An error! Error status: ' + status);
                                console.log(data);
                        });
                }
            };

            $("#button-like").on("click", postNewLike(true));

            $("#button-dislike").on("click", postNewLike(false));

        }
    };
}]);