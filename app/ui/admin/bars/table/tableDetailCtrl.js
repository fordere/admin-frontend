(function () {
    'use strict';

    var controllerId = 'fordere.admin.tableDetailCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$routeParams', 'tableService', '$location', adminTableDetailCtrl]);

    function adminTableDetailCtrl($routeParams, tableService, $location) {
        var vm = this;

        vm.save = save;

        if ($routeParams.id == 0) {
            vm.table = { TableId: 0, Name: 'Name', BarId: $routeParams.barId };
        } else {
            vm.table = tableService.get({ TableId: $routeParams.id });
        }

        function save() {
            vm.table.TableId = $routeParams.id;
            if ($routeParams.id == 0) {
                tableService.create(vm.table, () => navigateToOverview());
            } else {
                tableService.save(vm.table, () => navigateToOverview());
            }
        }

        function navigateToOverview() {
            $location.path('/admin/bars/' + $routeParams.barId + '/tables/');
        }
    }
})();