(function () {
  'use strict';

  var controllerId = 'fordere.leagueNavigationCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', '$route', 'seasonService', leagueNavigationCtrl]);

  function leagueNavigationCtrl($routeParams, $route, seasonService) {
    var vm = this;
    vm.competitionId = $routeParams.Id;
    vm.activetab = $route.current.$$route.activetab;

    vm.season = seasonService.getCurrent();
  }

})();