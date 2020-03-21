(function () {
    'use strict';

    var controllerId = 'fordere.divisionSelectionCtrl';

    angular.module('fordere')
        .controller(controllerId, ['divisionService', 'divisionHolder', '$location', 'AuthService', divisionSelectionCtrl]);

    function divisionSelectionCtrl(divisionService, divisionHolder, $location, authService) {
        var vm = this;
        vm.select = select;

        function select(divisionId) {
            divisionHolder.select(divisionId);
            $location.path('/');
        }

        function init() {
            divisionService.query().$promise.then(divisions => {
                if (authService.isAdmin()) {
                    vm.divisions = divisions;
                } else {
                    // TODO SSH Warum ist das ein string?
                    vm.divisions = divisions.filter(d => d.IsActive === "True");
                }

                if (vm.divisions.length === 1) {
                    select(vm.divisions[0].Id);
                }
            });
        }

        init();
    }
})();