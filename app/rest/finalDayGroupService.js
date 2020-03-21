(function () {
  angular.module('fordere.rest')
    .factory('finalDayGroupService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'finalday/competition/:FinalDayCompetitionId/group/:GroupId', { FinalDayCompetitionId: '@FinalDayCompetitionId' , GroupId: '@Id'}, {
          add: {
            isArray: false,
            method: 'POST',
          },
          getByTournament: {
            isArray: true,
            method: 'GET',
          }
        });
      }
    ]);
})();