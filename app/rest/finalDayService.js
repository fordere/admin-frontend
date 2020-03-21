(function () {
  angular.module('fordere.rest')
    .factory('finalDayService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'finalday/:Id/', { Id: '@Id' }, {
          getProgress: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'finalday/:Id/progress'
          }
        });
      }
    ]);
})();