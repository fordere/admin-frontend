(function () {
  angular.module('fordere.rest')
    .factory('einteilungService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(null, null, {
          get: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'season/einteilungen/:competitionId'
          }
        });
      }
    ]);
})();