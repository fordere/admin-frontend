(function () {
    'use strict';

    var controllerId = 'fordere.tournamentregistrationCtrl';

    angular.module('fordere')
        .controller(controllerId, ['tournamentRegistrationService', 'toastr', tournamentRegistrationCtrl]);


    function tournamentRegistrationCtrl(tournamentRegistrationService, toastr) {
        var vm = this;

        reset();

        vm.register = register;
        vm.isValid = isValid;
        vm.reset = reset;

        function reset() {
            vm.done = false;
            vm.model = {
                Tournaments: []
            };

            vm.nd = false;
            vm.dd = false;
            vm.od = false;
            vm.oe = false;
            vm.de = false;
            vm.mx = false;
            vm.ndteammate = undefined;
            vm.odteammate = undefined;
            vm.mxteammate = undefined;
            vm.ddteammate = undefined;
        }

        function isValid() {
            updateModel();

            if (!vm.model.UserName || vm.model.UserName.length === 0) {
                return false;
            }

            if (!vm.model.UserMail || vm.model.UserMail.length === 0) {
                return false;
            }

            if (vm.nd && (!vm.ndteammate || vm.ndteammate.length === 0)) {
                return false;
            }

            if (vm.od && (!vm.odteammate || vm.odteammate.length === 0)) {
                return false;
            }

            if (vm.dd && (!vm.ddteammate || vm.ddteammate.length === 0)) {
                return false;
            }

            if (vm.mx && (!vm.mxteammate || vm.mxteammate.length === 0)) {
                return false;
            }

            if (vm.model.Tournaments.length === 0) {
                return false;
            }

            return true;
        }

        function register() {
            updateModel();

            if (isValid()) {
                vm.inprogress = true;
                tournamentRegistrationService.registerSts(vm.model).$promise
                    .then(() => vm.done = true)
                    .catch(() => showError())
                    .finally(() => vm.inprogress = false);
            }
        }

        function showError() {
            toastr.error('Anmeldung fehlgeschlagen. Versuchst nochmals oder melde dich direkt bei info@fordere.ch');
        }

        function updateModel() {
            vm.model.Tournaments = [];
            if (vm.nd) {
                vm.model.Tournaments.push({ TournamentIdentifier: 'nd', TeamMate: vm.ndteammate });
            }

            if (vm.od) {
                vm.model.Tournaments.push({ TournamentIdentifier: 'od', TeamMate: vm.odteammate });
            }

            if (vm.dd) {
                vm.model.Tournaments.push({ TournamentIdentifier: 'dd', TeamMate: vm.ddteammate });
            }

            if (vm.mx) {
                vm.model.Tournaments.push({ TournamentIdentifier: 'mx', TeamMate: vm.mxteammate });
            }

            if (vm.oe) {
                vm.model.Tournaments.push({ TournamentIdentifier: 'oe' });
            }

            if (vm.de) {
                vm.model.Tournaments.push({ TournamentIdentifier: 'de' });
            }

        }
    }
})();
