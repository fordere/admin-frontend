(function () {
    'use strict';

    angular.module('fordere').controller('registerUserCtrl', ['$scope', 'registrationService', 'AuthService', registerUserCtrl]);

    function registerUserCtrl($scope, registrationService, authService) {
        var vm = this;
        vm.isAuthenticated = isAuthenticated;
        vm.profile = {};
        vm.login = login;
        vm.loginUser = {};

        $scope.$watch('ctrl.profile.Password', checkPassword);
        $scope.$watch('ctrl.password2', checkPassword);

        vm.register = register;

        function isAuthenticated() {
            return authService.isAuthenticated();
        }

        function login() {
            authService.authenticate(vm.loginUser);
        }

        function register() {
            registrationService.save(vm.profile).$promise.then(successfullySaved, errorSave);

            function successfullySaved() {
                vm.successfullyRegistered = true;
                vm.registerError = false;
            }

            function errorSave(error) {
                vm.successfullyRegistered = false;
                vm.registerError = true;

                vm.error = error.data.ResponseStatus.Message;

                if (!vm.error || vm.error.length === 0) {
                    vm.error = "Registration fehlgeschlagen! Überprüfe deine Eingabe!";
                }
            }
        }


        function checkPassword() {
            vm.arePasswordsEqual = true;
            var firstPassword = vm.profile.Password;
            var secondPassword = vm.password2;
            vm.arePasswordsEqual = firstPassword === secondPassword;
        }
    }

})();