(function () {
  'use strict';

  angular.module('fordere').controller('newPasswordCtrl', ['$scope', '$routeParams', '$location', '$http', 'API_URL', 'toastr', newPasswordCtrl]);

  function newPasswordCtrl($scope, $routeParams, $location, $http, API_URL, toastr) {
    var ctrl = this;

    ctrl.password1 = '';
    ctrl.password2 = '';

    ctrl.passwordsMatch = passwordsMatch;
    ctrl.setNewPassword = setNewPassword;

    function passwordsMatch() {
      console.log(ctrl.password1 == ctrl.password2);
      return ctrl.password1 == ctrl.password2;
    }

    function setNewPassword() {
      if (ctrl.passwordsMatch()) {
        $http({ method: 'POST', url: API_URL + 'recovery/password', data: { Token: $routeParams.token, Password: ctrl.password1 } }).
          then(function (data, status, headers, config) {
            $location.path('/password_set');
          });
      }
    }
  }

})();