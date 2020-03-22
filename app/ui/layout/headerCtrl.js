(function () {
    'use strict';

    var controllerId = 'fordere.headerCtrl';

    angular.module('fordere')
        .controller(controllerId, ['AuthService', 'seasonService', '$window', 'divisionHolder', 'competitionService', menuCtrl]);

    function menuCtrl(authService, seasonService, $window, divisionHolder, competitionService) {
        var vm = this;

        vm.isAdmin = authService.isAdmin;

        vm.shouldShowMySeason = shouldShowMySeason;
        vm.shouldShowRegister = shouldShowRegister;
        vm.shouldShowStandings = shouldShowStandings;
        vm.shouldShowRegisterNow = shouldShowRegisterNow;
        vm.reload = reload;
        vm.isDivision = isDivision;
        vm.isFinalDay = isFinalDay;

        function isFinalDay() {
            if (vm.season) {
                return vm.season.State === 'FinalDay';
            }

            return false;
        }

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }

        function reload() {
            if ($window.location.pathname === "/") {
                $window.location.reload();
            }
        }

        function shouldShowRegisterNow() {
            if (vm.season) {
                return vm.season.State === 'Registration';
            }
            return false;
        }

        function shouldShowMySeason() {
            if (vm.season) {
                return vm.season.State === 'Running';
            }
            return false;
        }

        function shouldShowRegister() {
            if (vm.season) {
                return vm.season.State === 'Registration' || vm.season.State === 'PrepareSeason';
            }
            return false;
        }

        function shouldShowStandings() {
            if (vm.season) {
                return vm.season.State === 'Running' || vm.season.State === 'PrepareFinalDay' || vm.season.State === 'FinalDay';
            }

            return false;
        }

        function init() {
            seasonService.getCurrent().$promise.then(season => {
                vm.season = season;

                if (vm.season.Id) {
                    competitionService.getBySeasonId({ Id: season.Id }).$promise.then(competitions => {
                        vm.competitions = competitions;
                    });
                }
            });
        }

        init();
    }

})();
