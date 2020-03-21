(function () {
    'use strict';

    var controllerId = 'fordere.admin.finalday.finishedMatchesCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$routeParams', 'finalDayMatchService', 'matchService', '$scope', 'dialogService', finishedMatchesCtrl]);

    function finishedMatchesCtrl($routeParams, finalDayMatchService, matchService, $scope, dialogService) {
        var vm = this;
        vm.finalDayId = $routeParams.Id;
        vm.pageSize = 30;
        vm.activePage = 1;


        $scope.$watch(() => vm.filterTeamName,
            () => {
                refreshMatches();
            });

        vm.showEditMatchDialog = function (match) {
            vm.editingMatch = angular.copy(match);
            dialogService.show('#editMatchDialog');
        };

        vm.hideEditMatchDialog = function () {
            dialogService.hide('#editMatchDialog');
        };

        vm.showDeleteMatchWarning = function (match) {
            vm.matchToReset = angular.copy(match);
            dialogService.show('#deleteMatchWarning');
        };

        vm.hideDeleteMatchWarning = function () {
            dialogService.hide('#deleteMatchWarning');
        };

        vm.isValidResult = function (match) {
            if (!match) {
                return false;
            }
            return match.HomeTeamScore > match.GuestTeamScore || match.GuestTeamScore > match.HomeTeamScore;
        };

        vm.saveResult = function (match) {
            matchService.patch({ Id: match.Id }, { ResultDate: new Date(), HomeTeamScore: match.HomeTeamScore, GuestTeamScore: match.GuestTeamScore }).$promise.then(function () {
                vm.hideEditMatchDialog();
                refreshMatches();
            });
        };

        vm.resetMatch = function (match) {
            matchService.patch({ Id: match.Id }, { ResultDate: null, PlayDate: null, FinalDayTableId: null, HomeTeamScore: null, GuestTeamScore: null }).$promise.then(function () {
                vm.hideDeleteMatchWarning();
                refreshMatches();
            });
        };

        vm.showPage = function (page) {
            if (page >= 1 && page <= vm.numPages()) {
                vm.activePage = page;
                refreshMatches();
            }
        };

        vm.numPages = function () {
            return Math.floor(((vm.finished ? vm.finished.Total || 0 : 0) + vm.pageSize - 1) / vm.pageSize);
        };

        vm.pages = function () {
            var numPages = vm.numPages();
            // TODO (sm): this can probably be improved/simplified...
            var pages = new Array(numPages);
            for (var i = 0; i < numPages; ++i) {
                pages[i] = i + 1;
            }
            return pages;
        };


        function refreshMatches() {
            var params = {
                PageSize: vm.pageSize,
                Page: vm.activePage,
                TeamFilter: vm.filterTeamName
            };

            finalDayMatchService.finished(params, { FinalDayId: vm.finalDayId }, function (result) {
                vm.finished = result;
            });
        }

        refreshMatches();
    }
})();
