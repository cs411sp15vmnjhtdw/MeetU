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
        templateUrl: '/static/views/base.html'
        // controller: 'BaseCtrl',
        // controllerAs: 'base'
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
