(function () {
  'use strict';

  var controllerId = 'fordere.admin.competitionsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', '$location', 'competitionService', competitionsCtrl]);

  function competitionsCtrl($routeParams, $location, competitionService) {
    var vm = this;
    vm.seasonId = $routeParams.seasonId;
    vm.competitions = competitionService.getBySeasonId({ Id: $routeParams.seasonId });

    vm.navigateToDetail = navigateToDetail;

    function navigateToDetail(id) {
      $location.path('/admin/competitions/' + id);
    }
  }
})();