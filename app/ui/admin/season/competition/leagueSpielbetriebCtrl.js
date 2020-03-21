(function () {
  'use strict';

  var controllerId = 'fordere.admin.leagueSpielbetriebCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', '$scope', 'matchService', 'leagueService', 'competitionService', 'teamService', 'teamInscriptionService', 'tableService', leagueSpielbetriebCtrl]);

  function leagueSpielbetriebCtrl($routeParams, $scope, matchService, leagueService, competitionService, teamService, teamInscriptionService, tableService) {
    var vm = this;

    vm.fetchMatches = fetchMatches;
    vm.formatLeagueText = formatLeagueText;
    vm.submitMoveTeam = submitMoveTeam;
    vm.deleteTeam = deleteTeam;
    vm.editMatch = editMatch;
    vm.saveMatch = saveMatch;
    vm.resetMatch = resetMatch;
    vm.cancelEditMatch = cancelEditMatch;

    vm.editTeam = editTeam;
    vm.saveTeam = saveTeam;
    vm.cancelEditTeam = cancelEditTeam;
    vm.setMatchesToNotPlayed = setMatchesToNotPlayed;
    vm.assignTeamInscription = assignTeamInscription;

    vm.startCompetition = startCompetition;
    vm.openDatePicker = openDatePicker;
    vm.teamFilter = '';

    $scope.$watch(() => vm.teamFilter, () => {
      if (vm.matches) {
        vm.filteredMatches = vm.matches.filter(x => x.HomeTeamName.indexOf(vm.teamFilter) >= 0 || x.GuestTeamName.indexOf(vm.teamFilter) >= 0);
      }
    });

    init();

    function assignTeamInscription() {
      leagueService.assignTeamInscriptionToLeague({ TeamInscriptionId: vm.teaminscriptionToAssign.Id, Id: vm.leagueToAssign.Id }, {}, function () {
        init();
        toastr.success('', 'Team zugewiesen!');

        vm.teaminscriptionToAssign = undefined;
        vm.leagueToAssign = undefined;
      });
    }

    function startCompetition() {
      competitionService.createTeamsAndMatches({ Id: $routeParams.id }, {}, function () {
        init();
        toastr.success('', 'Teams & Spiele erstellt!');
      });
    }

    function saveTeam() {
      $('#editTeamDialog').modal('hide');

      teamService.save(vm.teamToEdit, function () {
        fetchTeams();
      });
    }

    function cancelEditTeam() {
      $('#editTeamDialog').modal('hide');
    }

    function editTeam() {
      $('#editTeamDialog').appendTo('body').modal('show');
    }

    function init() {

      competitionService.getCompetitionState({ Id: $routeParams.id }, function (state) {

        switch (state.Value) {
          case 0:
            // Not yet ready -> not assigned teams
            vm.isCompetitionReady = false;
            break;
          case 1:
            // Ready to start but no matches/teams generated 
            vm.isCompetitionReady = true;
            vm.isCompetitionCreated = false;
            break;
          case 2:
            // Teams & matche generated --> running
            vm.isCompetitionReady = true;
            vm.isCompetitionCreated = true;

            fetchTables();
            fetchMatches();
            fetchTeams();
            fetchLeagues();
            fetchTeamInscriptions();
            break;
        }
      });
    }

    function fetchTeamInscriptions() {
      vm.teamInscriptions = teamInscriptionService.getAllNotAssignedTeamInscriptions({ competitionId: $routeParams.id });
    }

    function fetchLeagues() {
      vm.leagues = leagueService.byCompetitionId({ Id: $routeParams.id });
    }

    function fetchTables() {
      vm.tables = tableService.getAllTables();
    }

    function fetchTeams() {
      competitionService.getTeams({ Id: $routeParams.id }, function (data) {
        vm.teams = _.flatten(_.pluck(data, 'Teams'));
      });
    }

    function editMatch(match) {
      $('#editMatchLeague').appendTo('body').modal('show');

      var m = moment(match.PlayDate);
      m.locale();

      // TODO Somhow handle monutes and hour (timezone...)
      vm.editingMatch = {
        Id: match.Id,
        HomeTeamName: match.HomeTeamName,
        GuestTeamName: match.GuestTeamName,
        HomeTeamScore: match.HomeTeamScore,
        GuestTeamScore: match.GuestTeamScore,
        TableId: match.TableId,
        Date: new Date(match.PlayDate),
        Hour: m.hours(),
        Minutes: new Date(match.PlayDate).getMinutes()
      };
    }

    function openDatePicker($event) {
      $event.stopPropagation();
      vm.isDatePickerOpen = true;
    }

    function saveMatch() {

      vm.editingMatch.PlayDate = new Date(vm.editingMatch.Date);
      vm.editingMatch.PlayDate.setHours(vm.editingMatch.Hour);
      vm.editingMatch.PlayDate.setMinutes(vm.editingMatch.Minutes);

      $('#editMatchLeague').modal('hide');
      matchService.update(vm.editingMatch, () => {
        fetchMatches();
        vm.editingMatch = null;
      });
    }

    function resetMatch() {
      $('#editMatchLeague').modal('hide');

      matchService.reset({ Id: vm.editingMatch.Id }, () => {
        fetchMatches();
        vm.editingMatch = null;
      });
    }

    function cancelEditMatch() {
      vm.editingMatch = undefined;
      $('#editMatchLeague').modal('hide');
    }

    function fetchMatches() {
      if (!vm.leagueFilterId) {
        vm.matches = matchService.byCompetitionId({ Id: $routeParams.id });
      } else {
        vm.matches = matchService.byLeagueId({ Id: vm.leagueFilterId });
      }

      vm.filteredMatches = vm.matches;
    }

    function formatLeagueText(league) {
      if (league.Group > 0) {
        return league.Number + ". (Gruppe " + league.Group + ")";
      }

      return league.Number + ".";
    }

    function submitMoveTeam() {
      leagueService.moveTeam({ Id: vm.targetLeague, TeamId: vm.selectedTeam }, moveTeamSuccess, errorHandler);
    }

    function moveTeamSuccess() {
      vm.selectedTeam = null;
      vm.targetLeague = null;
      toastr.success('Team wurde verschoben.');
      fetchMatches();
    }

    function errorHandler(response) {
      toastr.error(response.statusText);
    }

    function deleteTeam() {
      teamService.delete({ Id: vm.teamToDelete }, deleteTeamSuccess, errorHandler);
    }

    function deleteTeamSuccess() {
      vm.teamToDelete = null;
      toastr.success('Team wurde gelöscht.');
      fetchMatches();
    }

    function setMatchesToNotPlayed() {

      competitionService.setMatchesToNotPlayed({ Id: $routeParams.id }, function () {
        fetchMatches();
      });
    }
  }

})();