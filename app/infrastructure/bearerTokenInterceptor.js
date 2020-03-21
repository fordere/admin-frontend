(function () {

  angular.module('fordere').factory('bearerTokenInterceptor', [
    '$window', '$q', '$location', function ($window, $q, $location) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.localStorage.getItem('token')) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
          }
          return config || $q.when(config);
        },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            console.log(rejection.config.url);
            if (rejection.config.url.endsWith("users/me") == false && rejection.config.url.endsWith("auth/credentials") == false) {
              $location.path('/auth_required');
            }
          }
          return $q.reject(rejection);
        }
      };
    }
  ]);

})();