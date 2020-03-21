(function () {
  'use strict';

  var controllerId = 'fordere.admin.paymentCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', '$location', 'paymentService', '$scope', paymentAdminCtrl]);

  function paymentAdminCtrl($routeParams, $location, paymentService, $scope) {
    var vm = this;
    vm.filter = '';
    vm.paidUsers = [];
    vm.togglePayment = togglePayment;
    vm.getPaidCount = getPaidCount;
    vm.getTotalPaymentsCount = getTotalPaymentsCount;
    vm.getPaidPercentage = getPaidPercentage;
    vm.getPaidAmount = getPaidAmount;

    $scope.$watch('vm.filter', function () {
      queryUsers();
    });

    function updateNotPayedUserMails() {
      var allMails = '';
      for (var i = 0; i < vm.notPaidUsers.length; i++) {
        var currentMail = vm.notPaidUsers[i].User.Email;
        if (i === 0) {
          allMails = currentMail;
        } else {
          allMails += ';' + currentMail;
        }
        ;
      }

      vm.openPaymentMails = allMails;
    }

    function queryUsers() {
      paymentService.queryOpen({ SeasonId: $routeParams.SeasonId, Filter: vm.filter }, function(data) {
        vm.notPaidUsers = data;
        updateNotPayedUserMails();
      });
      paymentService.queryDone({ SeasonId: $routeParams.SeasonId, Filter: vm.filter }, function (data) { vm.paidUsers = data; });
    }

    function togglePayment(paymentId) {

      var combinedList = _.union(vm.paidUsers, vm.notPaidUsers);
      var payment = _.find(combinedList, function (p) { return p.Id == paymentId; });

      if (!payment) {
        alert('There is something wrong!');
      }

      payment.HasPaid = !payment.HasPaid;

      paymentService.save(payment, function () {
        queryUsers();
      });

    }

    function getPaidCount() {
      if (vm.paidUsers) {
        return vm.paidUsers.length;
      }

      return 0;
    }

    function getPaidAmount() {
      if (vm.paidUsers) {
        // TODO: maybe we should not write this 25.- here in code XD
        return vm.paidUsers.length * 25;
      }

      return 0;
    }

    function getTotalPaymentsCount() {
      if (vm.paidUsers && vm.notPaidUsers) {
        return vm.notPaidUsers.length + vm.paidUsers.length;
      }

      return 0;
    }

    function getPaidPercentage() {
      return (getPaidCount() / getTotalPaymentsCount() * 100).toFixed(2);
    }
  }

})();