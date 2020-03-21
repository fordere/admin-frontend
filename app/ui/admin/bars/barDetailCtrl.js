(function () {
  'use strict';

  var controllerId = 'fordere.admin.barDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', '$routeParams', 'barService', barDetailCtrl]);

  function barDetailCtrl($location, $routeParams, barService) {
    var vm = this;
    vm.save = save;

    if ($routeParams.id == 0) {
      vm.bar = { Id: 0, Name: 'Name' };
    } else {
      vm.bar = barService.get({ Id: $routeParams.id });
    }

    function save() {
      barService.save(vm.bar, () => navigateToOverview());
    }

    function navigateToOverview() {
      $location.path('/admin/bars');
    }
  }

})();