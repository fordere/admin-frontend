(function () {
  angular.module('fordere.rest')
    .factory('fordereResource', function(API_URL, $resource) {
      return function(url, params, actions) {
        return $resource(API_URL + url, params, actions);
      };
    });
})();