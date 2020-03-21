(function () {
    'use strict';

    var controllerId = 'fordere.loginCtrl';

    angular.module('fordere')
        .controller(controllerId, ['divisionService', 'AuthService', 'divisionHolder', '$window', loginCtrl]);

    function loginCtrl(divisionService, authService, divisionHolder, $window) {
        var vm = this;

        function init() {
            divisionService.query().$promise.then(divisions => {
                vm.divisions = divisions;
            });
        }

        vm.getDivisions = getDivisions;
        vm.select = select;
        vm.isSelectedDivision = isSelectedDivision;
        vm.isDivision = isDivision;

        function getDivisions() {
            if (!vm.divisions) {
                return undefined;
            }

            if (authService.isAdmin()) {
                return vm.divisions;
                // TODO warum ein String? Gleicher code wie in divisionSelectionCtrl
            }
            return vm.divisions.filter(d => d.IsActive === "True");
        }

        function select(division) {
            divisionHolder.select(division.Id);
        }

        function isSelectedDivision(division) {
            return divisionHolder.getSelectedDivision() === division.Id;
        }

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }

        init();
    }

})();