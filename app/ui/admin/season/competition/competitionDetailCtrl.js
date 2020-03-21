(function () {
  'use strict';

  var controllerId = 'fordere.admin.competitionDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'competitionService', '$location', competitionDetailCtrl]);

  function competitionDetailCtrl($routeParams, competitionService, $location) {
    var vm = this;

    if ($routeParams.id != 0) {
      vm.league = competitionService.getById({ Id: $routeParams.id });
    } else {
      vm.league = { Id: 0, Name: "Neue Liga", RegistrationText: '', SeasonId: $routeParams.seasonId };
    }

    vm.save = save;
    vm.gotoList = gotoList;

    function save() {
      if (vm.league.Id != 0) {

        competitionService.save(vm.league).$promise.then(function () {
          vm.gotoList();
        });
      } else {
        competitionService.create(vm.league, function () {
          vm.gotoList();
        });
      }
    }

    function gotoList() {
      $location.path('/admin/season/' + $routeParams.seasonId + "/competitions/");
    }
  }

})();