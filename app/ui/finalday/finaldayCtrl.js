(function () {
  'use strict';

  var controllerId = 'fordere.finalDayCtrl';

  angular.module('fordere')
    .controller(controllerId, ['finalDayStandingsService', '$routeParams', finalDayCtrl]);

  function finalDayCtrl(finalDayStandingsService, $routeParams) {
    var vm = this;

    function init() {
      if ($routeParams.seasonId) {
        vm.competitions = finalDayStandingsService.query({ seasonId: $routeParams.seasonId });
      } else {
        vm.competitions = finalDayStandingsService.query({ seasonId: 'current' });
      }
    }

    init();
  }

})();