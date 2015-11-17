'use strict';

/**
 * @ngdoc overview
 * @description
 *
 * Main module of the application.
 */
angular
  .module('meetUApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/views/like/base.html',
        controller: 'LikeCtrl',
        controllerAs: 'like'
      })
      .when('/university', {
        templateUrl: '/static/views/university/base.html',
        controller: 'UniversityCtrl',
        controllerAs: 'university'
      })
      .when('/university/update/:universityid', {
        templateUrl: '/static/views/university/update.html',
        controller: 'UniversityCtrl',
        controllerAs: 'university'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
