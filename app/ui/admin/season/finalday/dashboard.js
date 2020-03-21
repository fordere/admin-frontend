(function () {
    'use strict';

    var controllerId = 'fordere.admin.finalday.dashboard';

    angular.module('fordere')
        .controller(controllerId, ['$routeParams', '$rootScope', 'competitionService', 'teamService', 'finalDayMatchService', 'finalDayTableService', 'matchService', 'dialogService', editCtrl]);

    function editCtrl($routeParams, $rootScope, competitionService, teamService, finalDayMatchService, finalDayTableService, matchService, dialogService) {
        var vm = this;

        vm.play = play;
        vm.cancel = cancel;
        vm.recall = recall;
        vm.result = result;
        vm.sendResult = sendResult;
        vm.getTables = getTables;
        vm.getTableNumber = getTableNumber;
        vm.selectTableToPlay = selectTableToPlay;
        vm.playOnTable = playOnTable;
        vm.getUpcommingMatches = getUpcommingMatches;
        vm.toggleShowAll = toggleShowAll;
        vm.isProgressVisible = true;

        vm.showAll = false;
        vm.upcomming;
        vm.running;
        vm.tables; // all tables with empty entry at the beginning for select input
        vm.allTables = [];
        vm.freeTables = [];

        vm.finalDayId = $routeParams.Id;

        $rootScope.$on('finalday:competitionstate:changed', function () {
            refreshUpcomming();
        });

        function init() {
            refreshUpcomming();
            refreshTables().then(function () { refreshRunning(); });
        }

        function toggleShowAll() {
            vm.showAll = !vm.showAll;
        }

        function getUpcommingMatches() {
            if (vm.upcomming === undefined || vm.upcomming.Matches === undefined) {
                return [];
            }

            if (vm.showAll) {
                return vm.upcomming.Matches;
            }

            return vm.upcomming.Matches.slice(0, 20);
        }

        function selectTableToPlay(match) {
            vm.editingMatch = match;

            dialogService.show('#selectTable');
        }

        function playOnTable(match) {
            play(match);
            dialogService.hide('#selectTable');
        }

        function notifyMatchChanged() {
            $rootScope.$broadcast('finalday:match:changed');
        }

        function refreshUpcomming() {
            vm.upcomming = finalDayMatchService.upcomming({}, { FinalDayId: $routeParams.Id });
        }

        function refreshRunning() {
            vm.running = finalDayMatchService.running({}, { FinalDayId: $routeParams.Id });

            vm.running.$promise.then(function () { calculateFreeTables(); });

            return vm.running.$promise;
        }

        function refreshTables() {
            return finalDayTableService.getAll({ FinalDayId: $routeParams.Id }, function (data) {
                vm.allTables = data;
                vm.tables = [vm.noTableSpecified].concat(data);
            }).$promise;
        }

        function calculateFreeTables() {
            var tables = angular.copy(vm.allTables);
            var usedTableIds = vm.running.map(function (match) { return match.FinalDayTableId; });

            vm.freeTables = tables.filter(function (table) { return usedTableIds.indexOf(table.Id) === -1; });
            vm.freeullrich = vm.freeTables.filter(function (table) { return table.TableType === 'Ullrich' }).length;
            vm.freegarlando = vm.freeTables.filter(function (table) { return table.TableType === 'GarlandoDeluxe'; }).length;
        }

        function getTables(tableType) {
            return vm.freeTables.filter(function (element) { return element !== undefined && element.TableType === tableType && element.Disabled === false; });
        }

        function getFreeTable(type) {
            var tables = vm.freeTables.filter(function (table) { return table !== undefined && table.TableType === type && table.Disabled === false });
            return tables.splice(0, 1)[0];
        }

        function play(match) {
            var now = new Date();

            if (!match.selectedTable) {
                match.selectedTable = getFreeTable(match.FinalDayTableType);
            }

            var promise = matchService.patch({ Id: match.Id }, { PlayDate: now, RegisterDate: now, FinalDayTableId: match.selectedTable.Id }).$promise;
            promise.then(function () {
                refreshUpcomming();
                refreshRunning();
                refreshTables();
                notifyMatchChanged();
            });
        }

        function recall(match) {
            var promise = matchService.patch({ Id: match.Id }, { PlayDate: new Date() }).$promise;
            promise.then(function (data) {
                match.PlayDate = data.PlayDate;
                notifyMatchChanged();
            });
        }

        function cancel(match) {
            var promise = matchService.patch({ Id: match.Id }, { PlayDate: null, RegisterDate: null, FinalDayTableId: null }).$promise;
            promise.then(function (data) {
                refreshUpcomming();
                refreshRunning();
                refreshTables();
                notifyMatchChanged();
            });
        }

        function result(match) {
            dialogService.show('#enterResult');

            vm.editingMatch = angular.copy(match);
            vm.editingMatch.HomeTeam = teamService.get({ Id: match.HomeTeamId });
            vm.editingMatch.GuestTeam = teamService.get({ Id: match.GuestTeamId });
        }

        function sendResult(match) {
            var promise = matchService.patch({ Id: match.Id }, { ResultDate: new Date(), HomeTeamScore: match.HomeTeamScore, GuestTeamScore: match.GuestTeamScore }).$promise;
            promise.then(function (data) {
                dialogService.hide('#enterResult');

                refreshUpcomming();
                refreshRunning();
                refreshTables();
                notifyMatchChanged();
            });
        }

        function getTableNumber(tableId) {
            var result = vm.tables.filter(function (table) { return table !== undefined && table.Id === tableId; });

            if (result.length === 1) {
                return result[0].Number;
            }

            return '?';
        }

        init();
    }
})();
