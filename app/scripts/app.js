'use strict';

/**
 * @ngdoc overview
 * @name angularD3App
 * @description
 * # angularD3App
 *
 * Main module of the application.
 */
angular
  .module('angularD3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as ctrl'
      })
      .when('/about', {
        templateUrl: 'scripts/d3/d3.html',
        controller: 'D3Controller as ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
