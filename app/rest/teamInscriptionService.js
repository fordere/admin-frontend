(function () {
  angular.module('fordere.rest')
    .factory('teamInscriptionService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'teaminscriptions', {Id: '@Id'}, {
          getTeamInscriptionForCompetitionForCurrentUser:
          {
            method: 'GET',
            url: API_URL + 'teaminscriptions/:competitionId/currentUser'
          },
          getAllNotAssignedTeamInscriptions: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'teaminscriptions/:competitionId/notAssigned'
          },
          deleteById: {
            method: 'DELETE',
            url: API_URL + 'teaminscriptions/:Id'
          },
          getById: {
            method: 'GET',
            url: API_URL + "teaminscriptions/:Id",
            isArray: false
          },
          byCompetitionId: {
            method: 'GET',
            url: API_URL + "teaminscriptions/competition/:Id",
            isArray: true
          },
          save: {
            method: 'PUT',
            url: API_URL + "teaminscriptions/:Id",
            isArray: false
          },
          create: {
            method: 'POST',
            url: API_URL + "teaminscriptions",
            isArray: false
          },
          updateAssignedLeague: {
            method: 'POST',
            url: API_URL + "teaminscriptions/:Id/updateassignedleague",
            isArray: false
          },
        });
      }
    ]);
})();