(function () {
  'use strict';

  angular.module('fordere').controller('profileCtrl', ['$scope', '$routeParams', '$location', 'MyUserProfile', 'AuthService', profileCtrl]);

  function profileCtrl($scope, $routeParams, $location, MyUserProfile, authService) {
    var ctrl = this;

    ctrl.profile = MyUserProfile.get();
    ctrl.saveProfile = saveProfile;

    ctrl.areBothOrNonePasswordDefined = areBothOrNonePasswordDefined;

    $scope.$watch('ctrl.profile.Password', checkPassword);
    $scope.$watch('ctrl.password2', checkPassword);

    function areBothOrNonePasswordDefined() {
      if (isFirstPasswordDefined() && isSecondPasswordDefined()) {
        return true;
      }

      if (!isFirstPasswordDefined() && !isSecondPasswordDefined()) {
        return true;
      }

      return false;
    }

    function isFirstPasswordDefined() {
      var firstPassword = ctrl.profile.Password;
      return !firstPassword || firstPassword.length === 0;
    }

    function isSecondPasswordDefined() {
      var secondPassword = ctrl.password2;
      return !secondPassword || secondPassword.length === 0;
    }

    function checkPassword() {
      ctrl.arePasswordsEqual = true;
      var firstPassword = ctrl.profile.Password;
      if (!firstPassword || firstPassword.length === 0) {
        return;
      }

      var secondPassword = ctrl.password2;
      if (!secondPassword || secondPassword.length === 0) {
        return;
      }

      ctrl.arePasswordsEqual = firstPassword === secondPassword;
    }

    function saveProfile() {
      ctrl.profile.$save(successfullySaved, saveFailed).then(() => authService.reload());
    }

    function successfullySaved() {
      ctrl.saveSuccess = true;
      ctrl.saveFailed = false;
    }

    function saveFailed() {
      ctrl.saveSuccess = false;
      ctrl.saveFailed = true;
    }

  }

})();