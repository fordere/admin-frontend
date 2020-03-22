(function () {
    var controllerId = 'fordere.homeCtrl';
    angular.module('fordere').controller(controllerId, ['divisionHolder', 'AuthService', homeCtrl]);

    function homeCtrl(divisionHolder, authService) {
        'use strict';
        var vm = this;

        vm.divisionId = divisionHolder.getSelectedDivision();
        vm.isAuthenticated = authService.isAuthenticated();
        vm.isAdmin = authService.isAdmin();

        function init() {
        }

        init();
    }
})();
