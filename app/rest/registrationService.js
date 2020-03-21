(function () {
  angular.module('fordere.rest')
    .factory('registrationService', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'register');
      }
    ]);
})();