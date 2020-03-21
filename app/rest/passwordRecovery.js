(function () {
  angular.module('fordere.rest')
    .factory('PasswordRecovery', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'recovery', null);
      }
    ]);
})();