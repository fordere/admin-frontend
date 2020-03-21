(function () {
    'use strict';

    var controllerId = 'fordere.admin.tableCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$location', 'tableService', '$routeParams', adminTableCtrl]);

    function adminTableCtrl($location, tableService, $routeParams) {
        var vm = this;
        vm.barId = $routeParams.barId;
        vm.createTable = createTable;

        tableService.getTablesInBar({ BarId: vm.barId }).$promise.then(function (tables) {
            vm.tables = tables;

            vm.tables.sort(function (a, b) {
                if (a.BarName < b.BarName) {
                    return -1;
                }

                if (a.BarName > b.BarName) {
                    return 1;
                }

                return 0;
            });
        });

        function createTable() {
            $location.path('/admin/bars/' + vm.barId + "/tables/0");
        }
    }
})();