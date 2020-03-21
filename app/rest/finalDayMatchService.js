(function () {
  angular.module('fordere.rest')
    .factory('finalDayMatchService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'finalday/:finalDayId/matches/', { finalDayId: '@FinalDayId' }, {
          recent: {
            isArray: false,
            method: 'GET',
            url: API_URL + 'finalday/:finalDayId/matches/recent'
          },
          upcomming: {
            isArray: false,
            method: 'GET',
            url: API_URL + 'finalday/:finalDayId/matches/upcomming'
          },
          running: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'finalday/:finalDayId/matches/running'
          },
          finished: {
            isArray: false,
            method: 'GET',
            url: API_URL + 'finalday/:finalDayId/matches/finished'
          }
        });
      }
    ]);
})();
