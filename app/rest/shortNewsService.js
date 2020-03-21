(function () {
  angular.module('fordere.rest')
    .factory('shortNewsService', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'news/?PageSize=:PageSize', null, {});
      }
    ]);
})();