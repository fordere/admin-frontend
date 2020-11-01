(function() {
  'use strict';

  var controllerId = 'fordere.breadcrumbCtrl';

  angular.module('fordere')
    .controller(controllerId, ['breadcrumbs', 'AuthService', '$scope', breadcrumbCtrl]);

  function breadcrumbCtrl(breadcrumbs, authService, $scope) {
    var vm = this;
    vm.breadcrumbs = breadcrumbs;
    vm.isAdmin = authService.isAdmin();
    vm.isAuthenticated = authService.isAuthenticated();

    $scope.$on('event:authenticated', function () {
      vm.isAuthenticated = authService.isAuthenticated();
      vm.isAdmin = authService.isAdmin();
    });
  }
})();
