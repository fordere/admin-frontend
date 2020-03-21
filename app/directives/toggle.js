(function () {

  angular.module('fordere.directives').directive('toggle', function () {
    return {
      restrict: 'E',

      controller: ['$scope', '$element', function ($scope, $element) {
        $scope.click = function () {
          var text = $($element).find('.fordere-toggle-content');

          if (text.hasClass("active")) {
            text.removeClass("active");
          } else {
            text.addClass("active");
          }
        }
      }],

      link: function ($scope, el) {
        $(el).find('a').bind('click', $scope.click);
      }
    };
  });

})();