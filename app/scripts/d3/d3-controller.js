'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularD3App
 */
angular.module('angularD3App')
  .controller('D3Controller', function (d3Service) {
    var model = this;
    var data = [
      { "id": 3, "x": 50, "y": 12000, "t": 1 },
      { "id": 1, "x": 60, "y": 2000, "t": 10},
      { "id": 2, "x": 70, "y": 17000, "t": 10000},
      { "id": 4, "x": 10, "y": 15000, "t": 1000},
      { "id": 5, "x": 50, "y": 16000, "t": 10}
    ];

    model.data = data;
    model.keys = _.keys(data[0]);

    model.x = 'x';
    model.y = 'y';
    model.color = 't';
    model.size = 'id';

    model.addData = function () {
      var obj = {
        'id': Math.floor(Math.random() * 700),
        'x': Math.floor(Math.random() * 500),
        't': Math.floor(Math.random() * 2500),
        'y': Math.floor( Math.random() * 50000)
      };

      console.log(obj);
      data.push(obj);

      //model.data.push({name: "New", score: 0});
    };

    model.removeData = function () {
      model.data.splice(model.data.length - 1, 1);
    }
  });
