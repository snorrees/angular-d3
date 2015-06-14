'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularD3App
 */
angular.module('angularD3App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
