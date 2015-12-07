'use strict';

angular.module('meetUApp')
.directive('likeTools',['$http', function ($http) {
    return {
        restrict : 'EA',
        templateUrl: "/static/views/like/_like_tools.html",  
        link: function(scope) {

            var newLike,
                newDislike,
                postNewLike;

            scope.getLikees();

            scope.postNewLike = function(isLiked) {
                    newLike = {
                            likee: scope.likees[scope.currentLikeeIndex].id,
                            liked: isLiked
                        }
                        console.log(newLike);
                    $http({
                            method: 'POST',
                            url: '/likes/',
                            data: $.param(newLike),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        }).success(function(response) {
                            console.log("like response");
                            console.log(response.data);

                                if (Object.keys(response.data).length !== 0) {
                                    alert("You have a match! Don't be shy to send the first e-mail! \n" +response.data.email);
                                }

                                scope.currentLikeeIndex++;
                                if (scope.currentLikeeIndex === scope.likees.length) {
                                    scope.currentLikeeIndex = 0;
                                    scope.getLikees();
                                }
                                console.log("Success creating new like entry!");
                        }).error(function(data) {
                                console.log('Oh no! An error! Error status: ' + status);
                                console.log(data);
                        });
            };

        //     $(document).keydown(function(e) {
        //     switch(e.which) {
        //         case 37: // left
        //         scope.postNewLike(false);
        //         break;

        //         case 39: // right
        //         scope.postNewLike(true);
        //         break;

        //         default: return; // exit this handler for other keys
        //     }
        //     e.preventDefault(); // prevent the default action (scroll / move caret)
        // });

            // $("#button-like").on("click", postNewLike(true));

            // $("#button-dislike").on("click", postNewLike(false));

        }
    };
}]);