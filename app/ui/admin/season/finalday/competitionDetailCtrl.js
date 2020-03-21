(function () {
  'use strict';

  var controllerId = 'fordere.admin.finalDay.competitionDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'usersService', 'finalDayTournamentService', 'finalDayGroupService', 'finalDayTeamService', 'teamService', 'seasonService', 'finalDayService', 'toastr', competitionDetailCtrl]);

  function competitionDetailCtrl($routeParams, usersService, finalDayTournamentService, finalDayGroupService, finalDayTeamService, teamService, seasonService, finalDayService, toastr) {
    var vm = this;

    var tournamentId = $routeParams.TournamentId;
    var finalDayId = $routeParams.FinalDayId;

    vm.teams = [];
    vm.finishedTournaments = [];
    vm.leagues = [];
    vm.groups = [];
    vm.players = [];
    vm.tournament = {};
    vm.overTakeSettingsLeague = {};
    vm.overTakeSettingsFinished = {};
    vm.overTakeSettingsSpecific = {};

    vm.tableTypes = [
      { key: "GarlandoDeluxe", text: "Garlando Deluxe" },
      { key: "Ullrich", text: "Ullrich" }
    ];
    vm.competitionModes = [
      { key: "SingleKO", text: "Single KO" },
      { key: "Group", text: "Gruppenphase" },
      { key: "Dyp", text: "DYP" },
      { key: "CrazyDyp", text: "Crazy DYP" }
    ];

    vm.stopTournament = stopTournament;
    vm.holdTournament = holdTournament;
    vm.resumeTournament = resumeTournament;
    vm.startTournament = startTournament;
    vm.deleteTeam = deleteTeam;
    vm.overTakeTeamsFinished = overTakeTeamsFinished;
    vm.overTakeTeamsLeague = overTakeTeamsLeague;
    vm.overTakeTeamsSpecific = overTakeTeamsSpecific;
    vm.saveTournamentDetails = saveTournamentDetails;
    vm.addGroup = addGroup;
    vm.deleteGroup = deleteGroup;
    vm.saveGroup = saveGroup;
    vm.isEditable = isEditable;

    vm.overTakeForderePlayer = overTakeForderePlayer;
    vm.addNewPlayer = addNewPlayer;

    vm.getCompetitionMode = getCompetitionMode;
    vm.getTableType = getTableType;

    vm.showStopTournamentWarning = showStopTournamentWarning;

    vm.isGroupCompetitionMode = isGroupCompetitionMode;
    vm.isSinglePlayerCompetitionMode = isSinglePlayerCompetitionMode;

    vm.togglePlayerActive = togglePlayerActive;
    vm.deletePlayer = deletePlayer;

    vm.getFilteredFordereUsers = getFilteredFordereUsers;

    vm.settlementSortListener = {
      itemMoved: teamMoved,
      orderChanged: teamMoved
    };

    function getFilteredFordereUsers() {
      return vm.fordereUser.filter(x => !vm.players.some(p => p.Player.Id === x.Id));
    }

    function deletePlayer(player) {
      finalDayTeamService.deletePlayer({ PlayerInFinalDayCompetitionId: player.Id }).$promise.then(() => {
        vm.players.splice(vm.players.indexOf(player), 1);
      });
    }

    function togglePlayerActive(player) {
      finalDayTeamService.togglePlayerActive({ PlayerInFinalDayCompetitionId: player.Id }).$promise.then(() => {
        player.IsActive = !player.IsActive;
      });
    }

    function overTakeForderePlayer() {
      overTakeForderePlayerByUserAuthId(vm.playerToAdd.Id).then((player) => {
        vm.players.push(player);
        vm.playerToAdd = undefined;
      });
    }

    function addNewPlayer() {
      usersService.create(vm.newPlayer).$promise.then((userAuth) => {
        overTakeForderePlayerByUserAuthId(userAuth.Id).then((player) => {
          vm.players.push(player);
          vm.newPlayer = {};
        });
      }).catch((data) => {
        toastr.error(data.data.ResponseStatus.Message);
      });
    }

    function overTakeForderePlayerByUserAuthId(userAuthId) {
      return finalDayTeamService.overtakeForderePlayer({ FinalDayCompetitionId: tournamentId, PlayerId: userAuthId }).$promise;
    }

    function isEditable() {
      return vm.tournament.State === "Ready";
    }

    function teamMoved(event) {
      var targetGroupId = event.dest.sortableScope.$parent.group.Id;
      var id = event.source.itemScope.teamInGroup.Id;
      finalDayTeamService.moveTeamInGroup({ FinalDayCompetitionId: tournamentId, TeamInGroupId: id, TargetGroupId: targetGroupId, TargetSettlement: event.dest.index + 1 }).$promise.then(teamMovedSuccessfull);
    }

    function teamMovedSuccessfull(movedTeams) {
      for (var i = 0; i < movedTeams.length; i++) {
        var team = movedTeams[i];

        var group = vm.groups.find(function (g) {
          return g.Id === team.GroupId;
        });

        var teamInGroupToUpdate = group.Teams.find(function (t) {
          return t.Id == team.Id;
        });

        teamInGroupToUpdate.Settlement = team.Settlement;
      }
    }

    function isGroupCompetitionMode() {
      return vm.tournament.CompetitionMode === "Group";
    }

    function isSinglePlayerCompetitionMode() {
      return vm.tournament.CompetitionMode === "CrazyDyp" || vm.tournament.CompetitionMode === "Dyp";
    }

    function getCompetitionMode() {
      var item = vm.competitionModes.filter(function (x) {
        return x.key === vm.tournament.CompetitionMode;
      });

      if (item.length === 0) {
        return '';
      }

      return item[0].text;
    }

    function getTableType() {
      var item = vm.tableTypes.filter(function (x) {
        return x.key === vm.tournament.TableType;
      });

      if (item.length === 0) {
        return '';
      }

      return item[0].text;
    }

    function stopTournament() {
      updateTournamentState("Ready");
      $('#stopTournamentWarning').modal('hide');
    }

    function showStopTournamentWarning() {
      $('#stopTournamentWarning').appendTo('body').modal('show');
    }

    function holdTournament() {
      updateTournamentState("OnHold");
    }

    function resumeTournament() {
      updateTournamentState("Running");
    }

    function startTournament() {
      updateTournamentState("Running");
    }

    function updateTournamentState(state) {
      return finalDayTournamentService.updateState({ Id: tournamentId, CompetitionState: state }).$promise.then(function () {
        vm.tournament.State = state;
      });
    }

    function deleteTeam(groupId, teamInGroupId) {
      finalDayTeamService.remove({ TeamInGroupId: teamInGroupId, FinalDayCompetitionId: tournamentId }).$promise.then(function (teamsUpdated) {

        var group = vm.groups.find(function (g) {
          return g.Id === groupId;
        });

        group.Teams = group.Teams.filter(function (t) {
          return t.Id !== teamInGroupId;
        });

        teamMovedSuccessfull(teamsUpdated);
      });
    }

    function overTakeTeamsFinished() {
      finalDayTeamService.overTakeTeams({ FinalDayCompetitionId: tournamentId }, vm.overTakeSettingsFinished).$promise
      .then(function () {
        loadExisting();
        toastr.success('Teams übernommen');
        vm.overTakeSettingsFinished = {};
      });
    }

    function overTakeTeamsLeague() {
      finalDayTeamService.overTakeTeams({ FinalDayCompetitionId: tournamentId }, vm.overTakeSettingsLeague).$promise
      .then(function () {
        loadExisting();
        toastr.success('Teams übernommen');
        vm.overTakeSettingsLeague = {};
      });
    }

    function overTakeTeamsSpecific() {

      if (!vm.isGroupCompetitionMode()) {
        // For non group-tournaments we always have one single group -> use this to assign specific teams...
        vm.overTakeSettingsSpecific.GroupId = vm.groups[0].Id;
      }

      finalDayTeamService.overTakeTeams({ FinalDayCompetitionId: tournamentId }, vm.overTakeSettingsSpecific).$promise
      .then(function () {
        loadExisting();
        toastr.success('Teams übernommen');
        vm.overTakeSettingsSpecific = {};
      });
    }

    function saveTournamentDetails() {
      finalDayTournamentService.save(vm.tournament);
    }

    function addGroup() {
      finalDayGroupService.add({ FinalDayCompetitionId: tournamentId }).$promise
        .then(function () {
          loadExisting();
          toastr.success('Gruppe hinzugefügt');
        });

    }

    function saveGroup(group) {
      finalDayGroupService.save(group);
      toastr.success('Gruppe gespeichert');
    }

    function deleteGroup(groupId) {
      finalDayGroupService.delete({ FinalDayCompetitionId: tournamentId, GroupId: groupId }).$promise
        .then(function () {
          loadExisting();
          toastr.success('Gruppe gelöscht');
        });
    }

    function init() {
      finalDayService.get({ Id: finalDayId }, function (finalday) {
        vm.finalday = finalday;
        vm.leagues = seasonService.getLeagues({ SeasonId: vm.finalday.SeasonId });
      });

      vm.finishedTournaments = finalDayTournamentService.getFinished({ FinalDayId: finalDayId, CompetitionMode: "Group" });
      finalDayTournamentService.get({ Id: tournamentId }).$promise.then((tournament) => {
        vm.tournament = tournament;
        loadExisting();
      });
    }

    function loadExisting() {
      if (isSinglePlayerCompetitionMode()) {
        finalDayTournamentService.getPlayers({ Id: tournamentId }).$promise.then(players => vm.players = players);
        vm.fordereUser = [];
        usersService.queryPossiblePartner({ CompetitionId: $routeParams.id }).$promise.then(users => vm.fordereUser = users.Users);
      } else {
        vm.groups = finalDayGroupService.getByTournament({ FinalDayCompetitionId: tournamentId });
        vm.teams = seasonService.getTeams({ SeasonId: vm.finalday.SeasonId });
      }
    }

    init();
  }
})();