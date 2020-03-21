(function () {

  angular.module('fordere.directives')
    .directive('showByDate', [
      function () {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {

            var showFrom = attrs.showFrom;
            var showUntil = attrs.showUntil;
            var shouldShow = false;

            if (showFrom && !showUntil) {
              shouldShow = getNow() >= new Date(showFrom);
            } else if (!showFrom && showUntil) {
              shouldShow = getNow() <= new Date(showUntil);
            } else if (showFrom && showUntil) {
              shouldShow = getNow() >= new Date(showFrom) && getNow() <= new Date(showUntil);
            } else {
              console.error('Do not know when to show an element... ');
            }

            if (shouldShow) {
              element.show();
            } else {
              element.hide();
            }
          }
        };

        function getNow() {
          return new Date().setHours(0, 0, 0, 0);
        }
      }
    ]);

})();