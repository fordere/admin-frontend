(function () {
    var controllerId = 'fordere.homeCtrl';
    angular.module('fordere').controller(controllerId, ['divisionHolder', homeCtrl]);

    function homeCtrl(divisionHolder) {
        'use strict';
        var vm = this;

        vm.divisionId = divisionHolder.getSelectedDivision();
        vm.isAuthenticated = false;

        function init() {
        }

        init();
    }
})();
