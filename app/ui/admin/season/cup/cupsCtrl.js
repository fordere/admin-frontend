(function() {
  'use strict';

  var controllerId = 'fordere.admin.cupsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', 'cupService', cupAdminCtrl]);

  function cupAdminCtrl($location, cupService) {
    var vm = this;
    vm.cups = cupService.query();

    vm.navigateToDetail = navigateToDetail;

    function navigateToDetail(id) {
      $location.path('/admin/cup/' + id);
    }
  }
})();