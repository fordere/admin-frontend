(function () {

  angular.module('fordere').factory('authHttpResponseInterceptor', [
    '$q', '$location', function($q, $location) {
      return {
        response: function(response) {
          return response || $q.when(response);
        },
        responseError: function(rejection) {
          if (rejection.status === 401) {
            console.log(rejection.config.url);
            if (rejection.config.url.endsWith("users/me") == false && rejection.config.url.endsWith("auth/credentials") == false) {
              $location.path('/auth_required');
            }
          }
          return $q.reject(rejection);
        }
      }
    }
  ]);

})();