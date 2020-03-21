(function () {
  angular.module('fordere.rest')
    .factory('MyUserProfile', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'users/me/profile', null, { 'save': { method: 'PUT' } });
      }
    ]);
})();