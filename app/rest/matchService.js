(function () {
  angular.module('fordere.rest')
    .factory('matchService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'matches/', { Id: '@Id' }, {
          queryUpcommingMatches: {
            isArray: true,
            method: 'GET',
            url: API_URL + "matches/upcomming"
          },
          queryRecentMatches: {
            isArray: true,
            method: 'GET',
            url: API_URL + "matches/recent"
          },
          queryById: {
            isArray: false,
            method: 'GET',
            url: API_URL + "matches/:Id"
          },
          queryUserMatches: {
            isArray: true,
            method: 'GET',
            url: API_URL + "/users/:Id/matches/current-season"
          },
          saveResult: {
            method: 'PUT',
            url: API_URL + "/matches/:Id/result"
          },
          update: {
            method: 'PUT',
            url: API_URL + "/matches/:Id"
          },
          reset: {
            method: 'POST',
            url: API_URL + "/matches/:Id/reset"
          },
          deleteResult: {
            method: 'DELETE',
            url: API_URL + '/matches/:Id/result'
          },
          enterAppointment: {
            method: 'PUT',
            url: API_URL + "/matches/:Id/appointment"
          },
          deleteAppointment: {
            method: 'DELETE',
            url: API_URL + "/matches/:Id/appointment"
          },
          byLeagueId: {
            method: 'GET',
            url: API_URL + 'leagues/:Id/matches',
            isArray: true
          },
          byCompetitionId: {
            method: 'GET',
            url: API_URL + 'competitions/:Id/matches',
            isArray: true
          },
          byTeamId: {
            method: 'GET',
            url: API_URL + 'matches/team/:Id',
            isArray: true
          },
          myDay: {
            method: 'GET',
            url: API_URL + 'matches/myday',
            isArray: true
          },
          patch: {
            method: 'PATCH',
            url: API_URL + 'matches/:Id',
            isArray: false
          }
        });
      }
    ]);
})();
