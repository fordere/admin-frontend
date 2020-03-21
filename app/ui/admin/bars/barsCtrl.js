(function() {
  'use strict';

  var controllerId = 'fordere.admin.barsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', 'barService', barAdminCtrl]);

  function barAdminCtrl($location, barService) {
    var vm = this;
    vm.bars = barService.query();
    vm.createBar = createBar;

    vm.navigateToDetail = navigateToDetail;

    function navigateToDetail(id) {
      $location.path('/admin/bars/' + id);
    }

    function createBar() {
      $location.path('/admin/bars/0');
    }
  }
})();