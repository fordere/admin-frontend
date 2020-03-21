(function() {

  angular.module('fordere.directives').directive('loginslidercloser', function() {
    return {
      link: function($scope, $element) {
        $element.bind('click', function() {
          var loginContainer = $('#login-container');
          if (loginContainer.is(':visible')) {
            loginContainer.slideUp();
          }
        });
      }
    };
  });
})();