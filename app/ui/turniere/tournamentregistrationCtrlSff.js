(function () {
    'use strict';

    var controllerId = 'fordere.tournamentregistrationSffCtrl';

    angular.module('fordere')
        .controller(controllerId, ['tournamentRegistrationService', 'toastr', tournamentRegistrationCtrlSff]);


    function tournamentRegistrationCtrlSff(tournamentRegistrationService, toastr) {
        var vm = this;

        reset();

        vm.register = register;
        vm.isValid = isValid;
        vm.reset = reset;
        vm.Total = 0;

        function reset() {
            vm.done = false;
            vm.Total = 0;
            vm.model = {
            };
        }

        function isValid() {
            if (!validatePlayer(vm.model.Player1, true)) {
                return false;
            }

            if (vm.model.Tournament === '0') {
                if (!validatePlayer(vm.model.Player2, true)) {
                    return false;
                }
            } else {
                if (!validatePlayer(vm.model.Player2, true)) {
                    return false;
                }

                if (!validatePlayer(vm.model.Player3, true)) {
                    return false;
                }

                if (!validatePlayer(vm.model.Player4, true)) {
                    return false;
                }

                if (!vm.model.TeamName || vm.model.TeamName.length === 0) {
                    return false;
                }
            }

            return true;
        }

        function validatePlayer(player, validateMail) {
            if (!player) {
                return false;
            }

            if (!player.Name || player.Name.length === 0) {
                return false;
            }

            if (validateMail && (!player.Mail || player.Mail.length === 0)) {
                return false;
            }

            if (!player.Abo || player.Abo.length === 0) {
                return false;
            }

            return true;
        }

        function register() {

            calculateTotal();

            if (isValid()) {
                vm.model.Total = vm.Total;
                vm.inprogress = true;
                tournamentRegistrationService.registerReisli(vm.model).$promise
                    .then(() => vm.done = true)
                    .catch(() => showError())
                    .finally(() => vm.inprogress = false);
            }
        }

        function showError() {
            toastr.error('Anmeldung fehlgeschlagen. Versuchst nochmals oder melde dich direkt bei info@fordere.ch');
        }

        function calculateTotal() {

            vm.Total = 0;
            vm.Total += getPriceForPlayer(vm.model.Player1);
            vm.Total += getPriceForPlayer(vm.model.Player2);
            vm.Total += getPriceForPlayer(vm.model.Player3);
            vm.Total += getPriceForPlayer(vm.model.Player4);

        }

        function getPriceForPlayer(player) {
            if (player === undefined) {
                return 0;
            }

            if (player.Abo === 'Anreise mit Gruppe - GA' || player.Abo === 'Individuelle Reise') {
                return 10;
            }

            if (player.Abo === 'Anreise mit Gruppe - Halbtax') {
                return 35;
            }

            return 40;
        }
    }
})();
