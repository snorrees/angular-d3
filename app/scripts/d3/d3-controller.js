'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularD3App
 */
angular.module('angularD3App')
  .controller('D3Controller', function (d3Service, $scope) {
    var model = this;
    var data = [
      {"id": 3, "x": 5, "y": 12000, "s": 1, "t": 1},
      {"id": 1, "x": 6, "y": 2000, "s": 10, "t": 1},
      {"id": 2, "x": 7, "y": 17000, "s": 10, "t": 1},
      {"id": 4, "x": 1, "y": 15000, "s": 24, "t": 1},
      {"id": 5, "x": 5, "y": 18000, "s": 10, "t": 1},
      {"id": 3, "x": 2, "y": 22000, "s": 1, "t": 2},
      {"id": 1, "x": 6, "y": 200, "s": 15, "t": 2},
      {"id": 2, "x": 2, "y": 17000, "s": 15, "t": 2},
      {"id": 4, "x": 5, "y": 19900, "s": 24, "t": 2},
      {"id": 5, "x": 5, "y": 13000, "s": 10, "t": 2}
    ];

    function subData(property, value) {
      return _.filter(data, function (d) {
        return d[property] === value;
      });
    }

    model.data = subData("t", 1);
    model.keys = _.keys(data[0]);

    model.x = 'x';
    model.y = 'y';
    model.color = 'id';
    model.size = 's';
    model.cross = 't';

    var t = 2;

    var d3 = d3Service.d3;

    function cross(d) {
      return d[model.cross];
    }

    function updateSlider() {
      model.slider = {
        value: data[0][model.cross],
        ticks: _.chain(data).map(model.cross).uniq().sortBy(function (x) {
          return x;
        }).value(),
        ticks_labels: _.chain(data).map(model.cross).uniq().sortBy(function (x) {
          return x;
        }).value()
      };
    }


    updateSlider();

    function updateAll() {
      updateSlider();
      model.data = subData(model.cross, model.slider.value);
    }

    $scope.$watch(function () {
      return model.cross;
    }, function (newValue) {
      updateAll();
    });

    $scope.$watch(function () {
      return model.slider.value;
    }, function (newValue) {
      model.data = subData(model.cross, model.slider.value);
    });

    model.addData = function () {
      t++;
      var i = 5;
      while (i > 0) {

        var obj = {
          'id': i,
          'x': Math.floor(Math.random() * 7),
          's': Math.floor(Math.random() * 25),
          'y': Math.floor(Math.random() * 50000),
          't': t
        };

        data.push(obj);
        i--;
      }
      updateAll();

      //model.data.push({name: "New", score: 0});
    };

    model.removeData = function () {
      var i = 5;
      t--;
      while (i > 0 && model.data.length) {
        data.splice(model.data.length - 1, 1);
        i--;
      }
      updateAll();
    }
  });
