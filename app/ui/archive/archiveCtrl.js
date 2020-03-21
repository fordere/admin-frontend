(function () {
  'use strict';

  var controllerId = 'fordere.archiveCtrl';

  angular.module('fordere').controller(controllerId, ['$q', 'cupService', 'competitionService', 'seasonService', archiveCtrl]);

  function archiveCtrl($q, cupService, competitionService, seasonService) {
    var vm = this;

    $q.all([cupService.query().$promise, competitionService.query().$promise, seasonService.queryArchived().$promise]).then(dataLoaded);

    function dataLoaded(data) {
      var cups = data[0];
      var competitions = data[1];
      var seasons = data[2];

      for (var seasonIndex = 0; seasonIndex < seasons.length; seasonIndex++) {
        var season = seasons[seasonIndex];
        season.competitions = competitions.filter(function (c) { return c.Season.Id === season.Id; });
        season.cups = cups.filter(function (c) { return c.SeasonId === season.Id; });
      }

      vm.seasons = seasons;
    }

  }
})();