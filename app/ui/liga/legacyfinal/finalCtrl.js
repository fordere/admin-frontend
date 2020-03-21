(function () {
  'use strict';

  var controllerId = 'fordere.finalCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'competitionService', finalCtrl]);

  function finalCtrl($routeParams, competitionService) {
    var vm = this;
    vm.competitionId = $routeParams.Id;
  }

})();