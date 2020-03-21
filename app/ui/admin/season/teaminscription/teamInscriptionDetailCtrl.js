
(function () {
  'use strict';

  var controllerId = 'fordere.admin.teamInscriptionDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'teamInscriptionService', '$location', 'usersService', 'barService', teamInscriptionDetailCtrl]);

  function teamInscriptionDetailCtrl($routeParams, teamInscriptionService, $location, usersService, barService) {
    var vm = this;

    if ($routeParams.id != 0) {
      vm.teamInscription = teamInscriptionService.getById({ Id: $routeParams.id });
    } else {
      vm.teamInscription = { Id: 0, CompetitionId: $routeParams.competitionId };
    }

    vm.save = save;
    vm.gotoList = gotoList;

    vm.players = [];
    usersService.queryPossiblePartner({ CompetitionId: $routeParams.id }).$promise.then(users => vm.players = users.Users);

    vm.bars = [];
    barService.query().$promise.then(bars => vm.bars = bars);

    function save() {
      if (vm.teamInscription.Id != 0) {
        teamInscriptionService.save(vm.teamInscription, function () {
          vm.gotoList();
        });
      } else {
        teamInscriptionService.create(vm.teamInscription, function () {
          vm.gotoList();
        });
      }
    }

    function gotoList() {
      $location.path('/admin/season/' + $routeParams.SeasonId + "/competitions/" + $routeParams.competitionId + "/teaminscriptions/");
    }
  }

})();