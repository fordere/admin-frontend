(function () {
  'use strict';

  var controllerId = 'fordere.einteilungCtrl';

  angular.module('fordere')
    .controller(controllerId, ['einteilungService', '$routeParams', einteilungCtrl]);

  function einteilungCtrl(einteilungService, routeParams) {
    var vm = this;
    einteilungService.get({ competitionId: routeParams.competitionId }).$promise.then(function (leagues) {
      vm.leagues = leagues;
    });
  }
})();
