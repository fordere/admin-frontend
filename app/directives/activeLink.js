(function () {

  angular.module('fordere.directives')
    .directive('activeLink', [
      '$location', function (location) {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var clazz = attrs.activeLink;
            var path = attrs.href;
            var isHomeLink = attrs.isHomeLink;
            scope.location = location;
            scope.$watch('location.path()', function (newPath) {

              if (path) {
                var isSame = newPath.indexOf(path.substr(1, path.length)) > -1;
                if (isHomeLink) {
                  isSame = newPath == '/';
                }

                if (isSame) {
                  $(element).closest('li').addClass(clazz);
                } else {
                  $(element).closest('li').removeClass(clazz);
                }
              }
            });
          }
        };
      }
    ]);

})();