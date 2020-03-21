(function () {
  angular.module('fordere.rest')
    .factory('barService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'bars/:Id', { Id: '@Id' }, {
          getPlayableBars: {
            isArray: true,
            method: 'GET',
            url: API_URL + 'bars/playable'
          }
        });
      }
    ]);
})();