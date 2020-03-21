(function () {
  'use strict';

  var controllerId = 'fordere.admin.teamInscriptionsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', '$location', 'teamInscriptionService', 'toastr', 'leagueService', teamInscriptionsAdminCtrl]);

  function teamInscriptionsAdminCtrl($routeParams, $location, teamInscriptionService, toastr, leagueService) {
    var vm = this;
    vm.loadTeams = loadTeams;
    vm.assignTeam = assignTeam;
    vm.displayLeagueText = displayLeagueText;
    vm.leaguesForCompetition = leaguesForCompetition;
    vm.deleteTeamInscription = deleteTeamInscription;
    vm.seasonId = $routeParams.SeasonId;
    vm.competitionId = $routeParams.competitionId;

    loadTeams();

    function leaguesForCompetition() {
      // TODO: fetch the list of available leagues dynamically from server
      return vm.selectedCompetition ? (vm.selectedCompetition.Name === 'Ullrich Liga' ? [1, 2, 3] : vm.selectedCompetition.Name === 'Garlando Liga' ? [1, 2, 3, 4, 5] : []) : [];
    }

    function loadTeams() {
      vm.teams = teamInscriptionService.byCompetitionId({ Id: $routeParams.competitionId });
      vm.leagueOptions = leagueService.byCompetitionId({ Id: $routeParams.competitionId });
    }

    function deleteTeamInscription() {
      teamInscriptionService.deleteById({ Id: vm.teaminscriptionToDeleteId }, deleteSucceded, deleteFailed);

      function deleteSucceded() {
        toastr.success('Team gelöscht');
        loadTeams();
      }

      function deleteFailed() {
        toastr.error('Löschen fehlgeschlagen!');
      }
    }

    function assignTeam(team) {
      teamInscriptionService.updateAssignedLeague(team, saveSucceded, saveFailed);

      function saveSucceded() {
        // NOOP
      }

      function saveFailed() {
        toastr.error('Zuweisung fehlgeschlagen!');
      }
    }

    function displayLeagueText(obj) {
      if (!obj.Group) {
        return obj.Number + ". Liga";
      }

      return obj.Number + ". Liga (Gruppe " + obj.Group + ")";
    }
  }

})();