(function () {
  angular.module('fordere.rest')
    .factory('cupService', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'cups/:Id', { Id: '@Id' }, {
          // not a rest call, lf cleaner solution
          createFromCompetition: {
            method: 'GET',
            url: API_URL + 'cups/:Id/create/:CompetitionId'
          },
          startNextRound: {
            method: 'POST',
            url: API_URL + 'cups/:Id/rounds'
          },
          getMatchesByRound: {
            method: 'GET',
            url: API_URL + 'cups/:Id/round/:Round',
            isArray: true
          },
          getMatches: {
            method: 'GET',
            url: API_URL + 'cups/:Id/matches',
            isArray: true
          }
        });
      }
    ]);
})();