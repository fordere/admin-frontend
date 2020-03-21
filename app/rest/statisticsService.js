(function () {
  angular.module('fordere.rest')
    .factory('statisticsService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'statistics/:SeasonId', null, {
          query: { isArray: false }
        });
      }
    ]);
})();