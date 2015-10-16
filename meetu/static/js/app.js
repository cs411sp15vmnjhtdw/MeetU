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
      .otherwise({
        redirectTo: '/'
      });
  });
