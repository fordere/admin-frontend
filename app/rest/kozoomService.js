(function () {
  angular.module('fordere.rest')
    .factory('kozoomService', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'kozoom');
      }
    ]);
})();