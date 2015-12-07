'use strict';

angular.module('meetUApp')
.directive('profileTools',['$http', function ($http) {
    return {
        restrict : 'EA',
        templateUrl: "/static/views/profile/_profile_tools.html",  
        link: function(scope) {
            

        }
    };
}]);