(function () {
  'use strict';

  var controllerId = 'fordere.admin.finaldayEditCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'finalDayTournamentService', 'finalDayTableService', 'finalDayService', 'dialogService', finaldayEditCtrl]);

  function finaldayEditCtrl($routeParams, finalDayTournamentService, finalDayTableService, finalDayService, dialogService) {
    var vm = this;

    vm.deleteTournament = deleteTournament;
    vm.showDeleteTournamentWarning = showDeleteTournamentWarning;

    function showDeleteTournamentWarning(competitionId) {
      vm.competitionToDeleteId = competitionId;
      dialogService.show('#deleteCompetitionWarning');
    }

    function deleteTournament() {
      finalDayTournamentService.delete({ Id: vm.competitionToDeleteId }, function () {
        for (var i = 0; i < vm.finaldayCompetitions.length; i++) {
          if (vm.finaldayCompetitions[i].Id === vm.competitionToDeleteId) {
            vm.finaldayCompetitions.splice(i, 1);
            break;
          }
        }
      });

      dialogService.hide('#deleteCompetitionWarning');
    }

    vm.addTable = function () {
      dialogService.show('#createFinalDayTableDialog');
    };
    vm.removeTable = function (table) {
      return finalDayTableService.remove({ Id: table.Id }).$promise.then(function () {
        vm.loadFinalDayTables();
      });
    };
    vm.createFinalDayTable = function () {
      vm.cancelCreateFinalDayTable();
      return finalDayTableService.add({
        FinalDayId: vm.finalDayId,
        Number: vm.newTable.Number,
        TableType: vm.newTable.TableType
      }).$promise.then(function () {
        vm.loadFinalDayTables();
      });
    };
    vm.cancelCreateFinalDayTable = function () {
      dialogService.hide('#createFinalDayTableDialog');
    };
    vm.addCompetition = function () {
      dialogService.show('#createFinalDayCompetitionDialog');
    };
    vm.createFinalDayCompetition = function () {
      vm.cancelCreateFinalDayCompetition();
      return finalDayTournamentService.add({
        FinalDayId: vm.finalDayId,
        Name: vm.newCompetition.Name,
        TableType: vm.newCompetition.TableType,
        CompetitionMode: vm.newCompetition.CompetitionMode,
        Priority: vm.newCompetition.Priority
      }).$promise.then(function () {
        vm.loadFinalDayCompetitions();
      });
    };
    vm.cancelCreateFinalDayCompetition = function () {
      dialogService.hide('#createFinalDayCompetitionDialog');
    };
    vm.updateTableNumber = function (table) {
      return finalDayTableService.updateNumber({ Id: table.Id, Number: table.Number });
    };
    vm.updateTableDisabled = function (table) {
      return finalDayTableService.updateDisabled({ Id: table.Id, Disabled: !table.Disabled }).$promise.then(function () {
        vm.loadFinalDayTables();
      });
    };
    vm.updateCompetitionName = function (competition) {
      return finalDayTournamentService.updateName({ Id: competition.Id, Name: competition.Name });
    };
    vm.loadFinalDayCompetitions = function () {
      vm.finaldayCompetitions = finalDayTournamentService.getAll({ FinalDayId: vm.finalDayId });
    };
    vm.loadFinalDayTables = function () {
      finalDayTableService.getAll({ FinalDayId: vm.finalDayId }).$promise.then(function (data) {
        vm.finaldayTables = data;
      });
    };

    function init() {
      vm.newCompetition = {
        TableType: "GarlandoDeluxe",
        CompetitionMode: "SingleKO",
        Priority: 1
      };
      vm.newTable = {
        TableType: "GarlandoDeluxe"
      };
      vm.finalDayId = $routeParams.Id;
      vm.finaldayTables = finalDayTableService.getAll({ FinalDayId: vm.finalDayId });
      vm.finaldayCompetitions = finalDayTournamentService.getAll({ FinalDayId: vm.finalDayId });

      finalDayService.get({ Id: vm.finalDayId }).$promise.then((finalDay) => vm.name = finalDay.Name);

      vm.tableTypes = [
        { key: "GarlandoDeluxe", name: "Garlando Deluxe" },
        { key: "Ullrich", name: "Ullrich" }
      ];
      vm.competitionModes = [
        { key: "SingleKO", name: "Single KO" },
        { key: "Group", name: "Gruppenphase" },
        { key: "CrazyDyp", name: "Crazy DYP" }
      ];
      vm.competitionStates = {
        Running: "Aktiv",
        OnHold: "Unterbrochen",
        Ready: "Bereit",
        Finished: "Beendet"
      };
    }

    init();
  }
})();