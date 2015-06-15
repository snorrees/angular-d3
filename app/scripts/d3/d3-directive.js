(function () {
  angular.module('angularD3App')
    .directive('d3Dir', function (d3Service, $window) {
      return {
        restrict: 'A',
        scope: {
          data: '=d3Data',
          x: '=d3X',
          y: '=d3Y',
          color: '=d3Color',
          size: '=d3Size',
          duration: '='
        },
        link: function (scope, element, attrs) {

          var d3 = d3Service.d3;
          var easeDuration = scope.duration | 500;

          var format = d3.time.format("%a %b %d %Y");

          function getter(property, d) {
            return d[property];
          }

          var propGetter = _.curry(getter);

          function id(d) {
            return d.id;
          }


          //function dateFn(d) {
          //  return format.parse(d.created_at)
          //}

          var $element = angular.element(element);

          var x = d3.scale.linear()
            .range([20, $element.width() - 40])
            .domain(d3.extent(scope.data, propGetter(scope.x))).nice();

          var y = d3.scale.linear()
            .range([$element.height() - 40, 20])
            .domain(d3.extent(scope.data, propGetter(scope.y))).nice();

          var size = d3.scale.linear()
            .range([2, 18])
            .domain(d3.extent(scope.data, propGetter(scope.size))).nice();

          var colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
            "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63",
            "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

          var heatmapColour = d3.scale.linear()
            .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
            .range(colours);

          var c = d3.scale.linear()
              .range([0, 1])
            .domain(d3.extent(scope.data, propGetter(scope.color)));


          var svg = d3.select(element[0])
            .append("svg:svg")
            .attr("width", "100%")
            .attr("height", "100%");

          var xAxis = d3.svg.axis().scale(x);
    //      var xAxisGroup = svg.append("g").call(xAxis);

          function render(data) {
            if (!data) {
              svg.selectAll("*").removeAll();
              return;
            }

            x.domain(d3.extent(data, propGetter(scope.x)));
            y.domain(d3.extent(data, propGetter(scope.y)));
            c.domain(d3.extent(data, propGetter(scope.color)));
            size.domain(d3.extent(data, propGetter(scope.size)));

            var circles = svg.selectAll("circle").data(data, id);

            function setPosition(selection){
              selection.attr("cx", function (d) {
                return x(propGetter(scope.x)(d));
              })
                .attr("cy", function (d) {
                  return y(propGetter(scope.y)(d));
                });
              return selection;
            }

            function setColorAndSize(selection) {
              selection.attr("r", function (d) {
                return size(propGetter(scope.size)(d));
              })
                .style("fill", function (d) {
                  return heatmapColour(c(propGetter(scope.color)(d)))
                });
              return selection;
            }

            setColorAndSize(
              setPosition(
                circles.transition().duration(easeDuration)
              )
            );

            var newCircles = setPosition(circles.enter().append("svg:circle"))
              .attr("r", function (d) {
                return 0.001;
              });

            setColorAndSize(newCircles.transition().duration(easeDuration));

            circles.exit().transition().duration(easeDuration).attr("r", 0).remove();

            d3.svg.axis().scale(x);
          }


          window.onresize = function () {
            scope.$apply();
          };

          scope.$watch('data', function (newVals, oldVals) {
            return render(newVals);
          }, true);

          function renderData() {
            return render(scope.data);
          }

          scope.$watch('x', renderData);
          scope.$watch('y', renderData);
          scope.$watch('color', renderData);
          scope.$watch('size', renderData);

          scope.$watch(function () {
            return angular.element($window)[0].innerWidth;
          }, function () {
            render(scope.data);
          });

        }
      };
    });
}());
