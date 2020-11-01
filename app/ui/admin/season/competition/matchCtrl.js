(function () {
    'use strict';

    var controllerId = 'fordere.admin.matchCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$routeParams', '$scope', 'matchService', 'leagueService', 'competitionService', 'teamService', 'teamInscriptionService', 'tableService', adminMatchCtrl]);

    function adminMatchCtrl($routeParams, $scope, matchService, leagueService, competitionService, teamService, teamInscriptionService, tableService) {
        var vm = this;

        vm.saveMatch = saveMatch;
        vm.resetMatch = resetMatch;
        vm.openDatePicker = openDatePicker;

        init();


        function init() {
            matchService.queryById({Id: $routeParams.matchid}, (match) => {
                initMatch(match);
            });
            vm.tables = tableService.getAllTables();
        }

        function initMatch(match) {
            vm.editingMatch = match;

            var m = moment(match.PlayDate);
            m.locale();

            vm.editingMatch.Date = new Date(match.PlayDate);
            vm.editingMatch.Hour = new Date(match.PlayDate).getUTCHours();
            vm.editingMatch.Minutes = new Date(match.PlayDate).getMinutes();
        }

        function openDatePicker($event) {
            $event.stopPropagation();
            vm.isDatePickerOpen = true;
        }

        function saveMatch() {
            vm.resetSuccess = false;
            vm.saveSuccess = false;
            vm.saveFailed = false;
            vm.editingMatch.PlayDate = new Date(vm.editingMatch.Date);
            vm.editingMatch.PlayDate.setHours(vm.editingMatch.Hour);
            vm.editingMatch.PlayDate.setMinutes(vm.editingMatch.Minutes);

            matchService.update(vm.editingMatch, () => {
                    vm.saveSuccess = true;
                },
                () => {
                    vm.saveFailed = true;
                });
        }

        function resetMatch() {
            vm.resetSuccess = false;
            vm.saveSuccess = false;
            vm.saveFailed = false;
            matchService.reset({Id: vm.editingMatch.Id}, (resetmatch) => {
                vm.resetSuccess = true;
                initMatch(resetmatch);
            });
        }
    }

})();
