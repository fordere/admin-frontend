(function () {
  angular.module('fordere.rest')
    .factory('smsService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'sms/', null, {
          send: {
            isArray: false,
            method: 'POST',
          }
        });
      }
    ]);
})();