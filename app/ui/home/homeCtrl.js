(function () {
    var controllerId = 'fordere.homeCtrl';
    angular.module('fordere').controller(controllerId, ['divisionHolder', 'AuthService', '$rootScope', homeCtrl]);

    function homeCtrl(divisionHolder, authService, $scope) {
        'use strict';
        var vm = this;

        vm.divisionId = divisionHolder.getSelectedDivision();
        vm.isAuthenticated = authService.isAuthenticated();
        vm.isAdmin = authService.isAdmin();
        vm.login = login;
        vm.loginUser = {};

        $scope.$on('event:authenticated', function () {
            vm.isAuthenticated = authService.isAuthenticated();
            vm.isAdmin = authService.isAdmin();
        });

        function init() {
        }

        function login() {
            authService.authenticate(vm.loginUser);
        }

        init();
    }
})();
