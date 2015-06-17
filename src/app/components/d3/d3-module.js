(function () {
  'use strict';

  angular.module('angularD3')
    .factory('d3Service', function () {
      return {d3: window.d3};
    });
}());

