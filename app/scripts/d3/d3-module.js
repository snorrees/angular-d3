(function () {
  angular.module('angularD3App')
    .factory('d3Service', function () {
      return {d3: window.d3};
    });
}());

