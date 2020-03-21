(function () {

  // TODO SSH: Rename to finalDayComopetitionService
  angular.module('fordere.rest')
    .factory('finalDayTournamentService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'finalday/competitions/:Id', { Id: '@Id' }, {
          updateState: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/competitions/:Id/state'
          },
          updateName: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/competitions/:Id/name'
          },
          updateTableType: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/competitions/:Id/tableType'
          },
          updateCompetitionMode: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/competitions/:Id/mode'
          },
          getFinished: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'finalday/:FinalDayId/finished'
          },
          getAll: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'finalday/competitions'
          },
          add: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/competitions'
          },
          getPlayers: {
            isArray: true,
            method: 'GET',
            url: API_URL + '/finalday/competitions/:Id/players'
          },
          createNewRound: {
            isArray: false,
            method: 'POST',
            url: API_URL + '/finalday/competitions/:Id/newround'
          }
        });
      }
    ]);
})();