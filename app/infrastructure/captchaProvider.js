(function() {

  angular.module('fordere').config([
      '$httpProvider', function($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
      $httpProvider.interceptors.push('authHttpResponseInterceptor');


    }
  ]);
})();