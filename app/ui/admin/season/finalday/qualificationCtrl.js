(function () {
  'use strict';

  var controllerId = 'fordere.admin.qualificationCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'seasonService', 'teamService', qualificationCtrl]);

  function qualificationCtrl($routeParams, seasonService, teamService) {
    var vm = this;

    vm.saveComment = saveComment;
    vm.toggleQualified = toggleQualified;

    function saveComment(tableEntry) {
      teamService.patch({ Id: tableEntry.TeamId, QualifiedForFinalDayComment: tableEntry.QualifiedForFinalDayComment });
    }

    function toggleQualified(tableEntry, newValue) {

      if (tableEntry.QualifiedForFinalDay === newValue) {
        tableEntry.QualifiedForFinalDay = 'Undefined';
      } else {
        tableEntry.QualifiedForFinalDay = newValue;
      }

      teamService.patch({ Id: tableEntry.TeamId, QualifiedForFinalDay: tableEntry.QualifiedForFinalDay });
    }

    function init() {
      vm.competitions = seasonService.getStandings({ Id: $routeParams.SeasonId });
    }

    init();
  }
})();