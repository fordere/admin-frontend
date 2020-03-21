(function () {
    'use strict';

    var controllerId = 'fordere.admin.usersCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$location', 'usersService', '$scope', userAdminCtrl]);

    function userAdminCtrl($location, userService, $scope) {
        var vm = this;
        vm.Total = 0;
        vm.CurrentPage = 1;
        vm.ItemsPerPage = 30;
        vm.pageChanged = pageChanged;
        vm.filter = '';

        $scope.$watch(angular.bind(this, function () {
            return this.filter;
        }), function () {
            queryUsers();
        });

        queryUsers();

        function applyServerResponse(data) {
            vm.users = data.Users;
            vm.Total = data.Total;
            vm.ItemsPerPage = data.PageSize;
        }

        function pageChanged() {
            queryUsers();
        }

        function queryUsers() {
            userService.query({ Page: vm.CurrentPage, PageSize: vm.ItemsPerPage, Filter: vm.filter }, function (data) {
                applyServerResponse(data);
            }, (err) => {
                console.log(err);
            });
        }
    }

})();