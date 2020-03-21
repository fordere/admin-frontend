(function () {
    'use strict';

    var controllerId = 'fordere.vereinCtrl';

    angular.module('fordere')
        .controller(controllerId, ['paymentService', 'divisionHolder', '$sce', vereinCtrl]);


    function vereinCtrl(paymentService, divisionHolder, $sce) {
        var vm = this;

        vm.isDivision = isDivision;

        paymentService.getPaymentInformations().$promise.then(infos => {
            vm.bankInformations = $sce.trustAsHtml(infos.BankInformations);
        });

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }
    }
})();
