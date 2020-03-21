(function () {
  angular.module('fordere.rest')
    .factory('teamService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'teams/:Id', { Id: '@Id' }, {
          queryById: {
            isArray: false,
            method: 'GET',
          },
          patch: {
            method: 'PATCH'
          }
        });
      }
    ]);
})();