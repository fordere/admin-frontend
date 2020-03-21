(function() {
  'use strict';

  var controllerId = 'fordere.breadcrumbCtrl';

  angular.module('fordere')
    .controller(controllerId, ['breadcrumbs', breadcrumbCtrl]);

  function breadcrumbCtrl(breadcrumbs) {
    var vm = this;
    vm.breadcrumbs = breadcrumbs;
  }
})();