(function() {

  angular.module('fordere.directives')
    .directive('timer', ['$interval', function($interval) {
        function calculate(t) {
          var days, hours, minutes, seconds;
          days = Math.floor(t / 86400);
          t -= days * 86400;
          hours = Math.floor(t / 3600) % 24;
          t -= hours * 3600;
          minutes = Math.floor(t / 60) % 60;
          t -= minutes * 60;
          seconds = t % 60;

          return minutes + (hours * 60) + ":" + ("0" + seconds).slice(-2);;
        }

        function updateContent(future, element) {
          var diff;
          diff = Math.floor((new Date().getTime() - future.getTime()) / 1000);

          return element.text(calculate(diff));
        }

        return {
          restrict: 'E',
          scope: { date: '=' },
          template: '<span></span>',
          link: function(scope, element) {
            var future;
            var interval;

            future = new Date(scope.date);

            updateContent(future, element);

            interval = $interval(function() {
                updateContent(future, element);
              },
              1000);

              scope.$watch('date', function(newValue, oldValue) {
                if (newValue != oldValue) {
                  future = new Date(newValue);
                }
              });

              element.on('$destroy', function() {
                $interval.cancel(interval);
              });
          }
        };
      }
    ]);

})();
