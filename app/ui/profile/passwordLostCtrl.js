(function () {
  'use strict';

  var controllerId = 'fordere.passwordLostCtrl';

  angular.module('fordere')
    .controller(controllerId, ['PasswordRecovery', passwordLostCtrl]);

  function passwordLostCtrl(passwordRecovery) {
    var vm = this;
    vm.renewPassword = renewPassword;
    vm.data = {};

    function renewPassword() {
      passwordRecovery.save(vm.data, onSuccess, onError);

      function onSuccess() {
        vm.couldNotRenew = false;
        vm.passwordRecoveryMailSent = true;
        vm.data.Email = '';
      }

      function onError(error) {
        vm.couldNotRenew = true;
        vm.passwordRecoveryMailSent = false;
        vm.error = error.data.ResponseStatus.Message;
      }
    }
  }
})();