(function () {
    'use strict';

    var controllerId = 'fordere.paymentCtrl';

    angular.module('fordere')
        .controller(controllerId, ["paymentService", 'StripeCheckout', 'AuthService', '$sce', paymentCtrl]);

    function paymentCtrl(paymentService, stripeCheckout, authService, $sce) {
        var vm = this;
        vm.openpayments = paymentService.queryUserOpen();
        vm.hasOpenEntries = true;

        paymentService.queryPaymentInformations().$promise.then(infos => {
            vm.bankInformations = $sce.trustAsHtml(infos.BankInformations);
            vm.publicStripeKey = infos.PublicStripeKey;
        });

        vm.openpayments.$promise.then(function () {
            if (vm.openpayments.length === 0) {
                vm.hasOpenEntries = false;
            }

            var sum = 0;
            for (var i = 0; i < vm.openpayments.length; i++) {
                sum += vm.openpayments[i].Amount;
            }

            // x = (sum + x) * 0.029 + 0.3
            // => Aufgelöst etwa das hier:
            vm.paymenttaxes = 0.30896 + 0.0298661 * sum;
            vm.total = sum;
        });

        var handler = stripeCheckout.configure();

        this.doCheckout = function (token, args) {
            vm.paymentInProgress = true;
            var options = {
                key: vm.publicStripeKey,
                name: "Mitgliederbeitrag",
                description: "Bar-foos-league",
                image: '/assets/images/logo_farbig.PNG',
                allowRememberMe: false,
                panelLabel: "Bezahlen",
                amount: (vm.total + vm.paymenttaxes) * 100,
                local: 'auto',
                email: authService.getAuthenticatedUser().Email,
                currency: 'chf'
            };

            handler.open(options)
                .then(function (result) {
                    paymentService.pay({ token: result[0].id, amount: Math.round((vm.total + vm.paymenttaxes) * 100) }).$promise.then(function () {
                        vm.hasOpenEntries = false;
                    }).catch(function () {
                        alert("Bezahlung fehlgeschlagen. Versuch es nochmals, falls es immer noch nicht funktioniert, melde dich bitte bei info@fordere.ch");
                        vm.paymentInProgress = false;
                    });
                }, function () {
                    vm.paymentInProgress = false;
                });
        };
    }
})();
