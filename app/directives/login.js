(function () {

  angular.module('fordere.directives').directive('login', ['AuthService', '$rootScope', function (AuthService, $rootScope) {
    return {
      restrict: 'E',

      templateUrl: 'app/ui/layout/login.html',

      link: function ($scope, $element, attrs) {
        $element.find('#login-panel').bind('click', function () {
          if ($scope.loginContainer.is(':visible')) {
            $scope.loginContainer.slideUp();
          } else {
            $scope.loginContainer.slideDown();
            $scope.loginUsernameInput.focus();
          }
        });


        $scope.resetLoginUser = function () {
          $scope.loginUser = { username: '', password: '', rememberMe: false };
        }

        $scope.resetLoginUser();
        $scope.loginContainer = $element.find('#login-container');
        $scope.loginUsernameInput = $element.find('#login-username');
        $scope.showLoginLink = !AuthService.isAuthenticated();

        $rootScope.$on("event:authenticated", function () {
          $scope.loginUser.password = '';
        });

        $scope.login = function () {
          AuthService.authenticate($scope.loginUser);
        }

        $scope.logout = function () {
          AuthService.logout();
        }

        $scope.$on('event:authenticated', function () {
          $scope.loginContainer.slideUp();
          $scope.showLoginLink = false;
        });

        $scope.$on('event:logout', function () {
          $scope.showLoginLink = true;
        });
      }
    };
  }]);

})();