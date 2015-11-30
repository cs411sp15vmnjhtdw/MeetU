'use strict';

/**
 * @ngdoc overview
 * @description
 *
 * Main module of the application.
 */
angular
  .module('meetUApp', [
    'ngRoute',
    'ngFileUpload',
    'ngImgCrop'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/static/views/home.html'
      })
      .when('/profile', {
        templateUrl: '/static/views/profile/base.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/like', {
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
