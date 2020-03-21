(function () {
  angular.module('fordere.rest')
    .factory('leagueService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'leagues', { Id: '@Id' }, {
          byCompetitionId: {
            method: 'GET',
            url: API_URL + "competitions/:Id/leagues",
            isArray: true
          },
          getById: {
            method: 'GET',
            url: API_URL + "leagues/:Id",
            isArray: false
          },
          save: {
            method: 'PUT',
            url: API_URL + "leagues/:Id",
            isArray: false
          },
          create: {
            method: 'POST',
            url: API_URL + "leagues",
            isArray: false
          },
          getUserMailsForOpenMatches: {
            method: 'GET',
            isArray: false,
            url: API_URL + 'leagues/:Id/open-matches/usermails',
          },
          moveTeam: {
            method: 'POST',
            url: API_URL + 'leagues/:Id/teams'
          },
          assignTeamInscriptionToLeague: {
            method: 'POST',
            url: API_URL + 'leagues/:Id/assignfromteaminscription/:TeamInscriptionId'
          }
        });
      }
    ]);
})();