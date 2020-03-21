(function () {
  angular.module('fordere.rest')
    .factory('finalDayTeamService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(null, { FinalDayCompetitionId: '@FinalDayCompetitionId', TeamInGroupId: '@TeamInGroupId', PlayerInFinalDayCompetitionId: '@PlayerInFinalDayCompetitionId' }, {
          overTakeTeams: {
            isArray: true,
            method: 'POST',
            url: API_URL + 'finalday/competition/:FinalDayCompetitionId/putteamover'
          },
          overtakeForderePlayer: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/competition/:FinalDayCompetitionId/overtakeforderplayer'
          },
          remove: {
            isArray: true,
            method: 'DELETE',
            url: API_URL + 'finalday/competition/:FinalDayCompetitionId/group/deleteteam/:TeamInGroupId'
          },
          moveTeamInGroup: {
            isArray: true,
            method: 'POST',
            url: API_URL + 'finalday/competition/:FinalDayCompetitionId/group/moveteam/:TeamInGroupId'
          },
          togglePlayerActive: {
            isArray: false,
            method: 'POST',
            url: API_URL + 'finalday/players/:PlayerInFinalDayCompetitionId/toggleactive'
          },
          deletePlayer: {
            isArray: false,
            method: 'DELETE',
            url: API_URL + 'finalday/players/:PlayerInFinalDayCompetitionId'
          }
        });
      }
    ]);
})();