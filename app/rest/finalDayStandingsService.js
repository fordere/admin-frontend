(function () {
  angular.module('fordere.rest')
    .factory("finalDayStandingsService", [
      '$resource', 'API_URL', function ($resource, API_URL) {
      return $resource(API_URL + 'season/:seasonId/finaldaystandings');
      }
    ]);
})();