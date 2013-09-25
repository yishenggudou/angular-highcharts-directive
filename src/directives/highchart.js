'use strict';

angular.module('chartsExample.directives',[])

.directive('chart', function () {
  return {
    restrict: 'E',
    template: '<div></div>',
    scope: {
        chartData: "=value"
    },
    transclude:true,
    replace: true,

    link: function (scope, element, attrs) {
      var chartsDefaults = {
        chart: {
          renderTo: element[0],
          type: attrs.type || null,
          height: attrs.height || null,
          width: attrs.width || null
        },
        exporting:{enabled:false}, 
        credits:{enabled:false},
        colors: ['#38d5df','#f9b700','#eb6100','#e76017','#7fb334','#a7413e']
      };
      
        //Update when charts data changes
        scope.$watch(function() { return scope.chartData; }, function(value) {
          if(!value) return;
            // We need deep copy in order to NOT override original chart object.
            // This allows us to override chart data member and still the keep
            // our original renderTo will be the same
            var deepCopy = true;
            var newSettings = {};
            $.extend(deepCopy, newSettings, chartsDefaults, scope.chartData);
            var chart = new Highcharts.Chart(newSettings);
        });
      }
    };

});
