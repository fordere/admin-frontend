(function() {
  'use strict';

  var controllerId = 'fordere.cupTreeCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', '$routeParams', 'cupService', 'competitionService', 'matchService', cupDetailCtrl]);

  function cupDetailCtrl($location, $routeParams, cupService, competitionService, matchService) {
    var vm = this;

    init();

    function init() {
      vm.cup = cupService.get({ Id: $routeParams.id }, function() {
        vm.matches = cupService.getMatches({ Id: $routeParams.id });
      });
    }
    
  }
})();