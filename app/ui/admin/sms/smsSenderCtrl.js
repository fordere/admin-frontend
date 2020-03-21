(function () {
  'use strict';

  var controllerId = 'fordere.admin.smsSenderCtrl';

  angular.module('fordere')
    .controller(controllerId, ['smsService', 'toastr', smsSenderCtrl]);

  function smsSenderCtrl(smsService, toastr) {
    var vm = this;

    vm.send = send;

    function send() {
      vm.sending = true;
      smsService.send({ Number: vm.number, Text: vm.text }, function() {
        toastr.success('SMS gesendet an ' + vm.number);
        vm.number = "";
        vm.text = "";
      }, function() {
        toastr.error('SMS konnte nicht gesendet werden!');
      }).$promise.finally(function() {
        vm.sending = false;
      });
    }
  }
})();