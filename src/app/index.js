'use strict';

angular.module('angularD3', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'ngMdIcons'])
  .config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as ctrl'
      })
      .state('d3', {
        url: '/d3',
        templateUrl: 'app/components/d3/d3.html',
        controller: 'D3Controller as ctrl'
      });

    $urlRouterProvider.otherwise('/');


    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .backgroundPalette('blue-grey').dark();
  })
;
