(function () {
    'use strict';

    var controllerId = 'fordere.standingsCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$routeParams', 'competitionService', 'divisionHolder', standingsCtrl]);

    function standingsCtrl($routeParams, competitionService, divisionHolder) {
        var vm = this;

        vm.getFinaltagBanInfo = getFinaltagBanInfo;
        vm.getSelectedDivision = divisionHolder.getSelectedDivision;
        vm.hasEnoughGamesForFinalDay = hasEnoughGamesForFinalDay;

        vm.competitionId = $routeParams.Id;
        competitionService.getStandings({ Id: $routeParams.Id }, function (competition) {

            for (var leagueIndex in competition.Leagues) {
                var league = competition.Leagues[leagueIndex];

                var playedCount = 0;
                for (var tableEntryIndex in league.TableEntries) {
                    var tableEntry = league.TableEntries[tableEntryIndex];
                    playedCount += tableEntry.GamesPlayed;
                }

                playedCount /= 2;

                var teamCount = league.TableEntries.length;
                var totalGamesToPlay = (teamCount / 2) * (teamCount - 1);

                if (league.LeagueMatchCreationMode === 'Double') {
                    totalGamesToPlay *= 2;
                }

                league.PlayedGamesPercent = 100.0 / totalGamesToPlay * playedCount;
            }

            vm.competition = competition;
        });

        function hasEnoughGamesForFinalDay(tableEntry, league) {
            if (league.LeagueMatchCreationMode === 'Single') {
                return league.TableEntries.length - tableEntry.GamesPlayed - 1 > 2;
            } else if (league.LeagueMatchCreationMode === 'Double') {
                return league.TableEntries.length * 2 - tableEntry.GamesPlayed - 2 > 2;
            }

            throw new Error('unknown league creation mode');
        }

        function getFinaltagBanInfo(tableEntry) {
            if (tableEntry.IsTeamForfaitOut) {
                return "Forfait Out!";
            }

            if (tableEntry.GamesNotPlayed > 2) {
                return "Zu wenig Spiele absolviert!";
            }

            return "Unter der 75% Grenze!";
        }
    }

})();