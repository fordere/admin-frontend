﻿(function () {

    angular.module('fordere.services').service('AuthService', [
        '$window', '$http', '$rootScope', '$localStorage', 'API_URL', 'usersService', '$cookies', '$location', 'toastr', function ($window, $http, $rootScope, $localStorage, API_URL, User, $cookies, $location, toastr) {
            var authenticatedUser = {};
            var isAuthenticated = $cookies.get('ss-id') != undefined;

            // recheck if our session is still alive on the server
            if (isAuthenticated) {
                authenticatedUser = User.get({ id: 'me' }, function () {
                }, function () {
                    setLoggedOut();
                    $rootScope.$broadcast('event:logout');
                });
            }

            this.getAuthenticatedUser = function () {
                return authenticatedUser;
            }

            this.isAuthenticated = function () {
                return isAuthenticated;
            }

            this.isAdmin = function () {
                return authenticatedUser != undefined && authenticatedUser.isAdmin;
            }

            var vm = this;
            vm.reload = function () {
                authenticatedUser = User.get({ id: 'me' }, function () {
                    isAuthenticated = true;
                    $rootScope.$broadcast('event:authenticated');
                });
            }

            this.authenticate = function (loginUser) {
                $http({ method: 'POST', url: API_URL + 'auth/credentials', data: { UserName: loginUser.username, Password: loginUser.password, RememberMe: loginUser.rememberMe } })
                    .then(function (data, status, headers, config) {
                      $window.localStorage.setItem('token', data.data.bearerToken);
                      vm.reload();
                    })
                    .catch(function (data, status, headers, config) {
                        setLoggedOut();
                        toastr.error("Login fehlgeschlagen!");
                    });
            }

            this.logout = function () {
                setLoggedOut();

                $location.path('/');

                $rootScope.$broadcast('event:logout');

                $http({ method: 'GET', url: API_URL + 'auth/logout' });
            }

            function setLoggedOut() {
                isAuthenticated = false;
                authenticatedUser = {};
                $window.localStorage.setItem('token', undefined);
            }

        }
    ]);

})();
