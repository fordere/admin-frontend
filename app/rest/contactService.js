(function () {
  angular.module('fordere.rest')
    .factory('contactService', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource(API_URL + 'contact');
      }
    ]);
})();