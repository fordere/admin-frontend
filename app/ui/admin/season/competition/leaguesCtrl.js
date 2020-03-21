(function () {
  'use strict';

  var controllerId = 'fordere.admin.leaguesCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', '$location', 'leagueService', leaguesCtrl]);

  function leaguesCtrl($routeParams, $location, leagueService) {
    var vm = this;
    vm.seasonId = $routeParams.seasonId;
    vm.competitionId = $routeParams.competitionId;
    vm.leagues = leagueService.byCompetitionId({ Id: $routeParams.competitionId });

    vm.navigateToDetail = navigateToDetail;

    function navigateToDetail(id) {
      $location.path('/admin/competitions/' + id);
    }
  }
})();