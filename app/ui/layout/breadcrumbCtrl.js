(function() {
  'use strict';

  var controllerId = 'fordere.breadcrumbCtrl';

  angular.module('fordere')
    .controller(controllerId, ['breadcrumbs', 'AuthService', breadcrumbCtrl]);

  function breadcrumbCtrl(breadcrumbs, authService) {
    var vm = this;
    vm.breadcrumbs = breadcrumbs;
    vm.isAdmin = authService.isAdmin();
    vm.isAuthenticated = authService.isAuthenticated();
  }
})();
