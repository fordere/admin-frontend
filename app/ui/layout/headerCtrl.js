(function () {
    'use strict';

    var controllerId = 'fordere.headerCtrl';

    angular.module('fordere')
        .controller(controllerId, ['AuthService', 'seasonService', '$window', 'divisionHolder', 'competitionService', menuCtrl]);

    function menuCtrl(authService, seasonService, $window, divisionHolder) {
        var vm = this;

        vm.isAdmin = authService.isAdmin;
        vm.reload = reload;
        vm.isDivision = isDivision;

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }

        function reload() {
            if ($window.location.pathname === "/") {
                $window.location.reload();
            }
        }
    }

})();
