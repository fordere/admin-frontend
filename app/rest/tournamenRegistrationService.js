(function () {
  angular.module('fordere.rest')
    .factory('tournamentRegistrationService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'tournamentregistration', null, {
          registerSts: {
              method: 'POST',
              url: API_URL + 'tournamentregistration/sts'
            },
          registerReisli: {
              method: 'POST',
              url: API_URL + 'tournamentregistration/reisli'
          }
        });
      }
    ]);
})();