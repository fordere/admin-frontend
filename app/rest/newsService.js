(function () {
  angular.module('fordere.rest')
    .factory('newsService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'news/:Id', null, {
          'save': {
            method: 'PUT'
          },
          'create': {
            method: 'POST'
          }
        });
      }
    ]);
})();