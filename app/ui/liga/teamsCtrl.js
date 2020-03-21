(function () {
  'use strict';

  var controllerId = 'fordere.teamsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'competitionService', tableCtrl]);

  function tableCtrl($routeParams, competitionService) {
    var vm = this;

    vm.competitionId = $routeParams.Id;
    vm.leagues = competitionService.getTeams({ Id: $routeParams.Id });
  }

})();