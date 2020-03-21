(function () {
    var controllerId = 'fordere.homeCtrl';
    angular.module('fordere').controller(controllerId, ['$location', '$filter', 'shortNewsService', 'matchService', 'finalDayMatchService', 'finalDayService', 'seasonService', 'divisionHolder', '$sce', homeCtrl]);

    function homeCtrl($location, $filter, shortNewsService, matchService, finalDayMatchService, finalDayService, seasonService, divisionHolder, $sce) {
        'use strict';
        var vm = this;

        vm.divisionId = divisionHolder.getSelectedDivision();
        vm.isFirstMatchInBar = isFirstMatchInBar;
        vm.getNumberOfMatchesInThisBar = getNumberOfMatchesInThisBar;
        vm.isToday = isToday;
        vm.formatMatchDate = formatMatchDate;
        vm.navigateToMatchDetail = navigateToMatchDetail;
        vm.isHomeTeamWin = isHomeTeamWin;
        vm.isGuestTeamWin = isGuestTeamWin;

        function isHomeTeamWin(match) {
            return match.GuestTeamScore < match.HomeTeamScore;
        }

        function isGuestTeamWin(match) {
            return match.HomeTeamScore < match.GuestTeamScore;
        }

        function navigateToMatchDetail(id) {
            $location.path(id);
        }

        function isToday(playDate) {
            var today = new Date();
            return playDate === formatMatchDate(today);
        }

        function getNumberOfMatchesInThisBar(barName, matches) {
            var count = 0;
            matches.forEach(match => {
                if (match.BarName === barName) {
                    count++;
                }
            });

            return count;
        }

        function isFirstMatchInBar(isFirst, previousMatch, currentMatch) {
            if (isFirst) {
                return true;
            }

            if (previousMatch.BarName !== currentMatch.BarName) {
                return true;
            }

            return false;
        }

        function formatMatchDate(date) {
            return $filter('date')(date, 'EEEE, dd.MM.yyyy', 'UTC');
        }

        function successfullyLoadedRecentMatches(matchList) {
            vm.recentMatches = sortAndGroupMatches(matchList, true);
        }

        function successfullyLoadedMatches(matchList) {
            vm.upcommingMatches = sortAndGroupMatches(matchList, false);
        }

        function sortAndGroupMatches(matchList, useReverse) {
            var groupedMatches = _.chain(matchList).groupBy(groupByPlayDate).sortBy(sortByDateGrouped);

            if (useReverse) {
                groupedMatches = groupedMatches.reverse();
            }

            groupedMatches = groupedMatches.value();

            for (var first in groupedMatches) {
                groupedMatches[first].sort((x, y) => sort(x, y));
            }

            return groupedMatches;
        }

        function groupByPlayDate(item) {
            return formatMatchDate(item.PlayDate);
        }

        function sortByDateGrouped(item) {
            return item[0].PlayDate;
        }

        function sort(first, second) {
            if (first.BarName < second.BarName) {
                return -1;
            }

            if (first.BarName > second.BarName) {
                return 1;
            }

            if (first.PlayDate < second.PlayDate) {
                return -1;
            }

            if (first.PlayDate > second.PlayDate) {
                return 1;
            }

            return 0;
        }

        function seasonLoaded(season) {
            vm.season = season;

            vm.infosEinteilung = $sce.trustAsHtml(season.InfosEinteilung);
            vm.infosPrepareSeason = $sce.trustAsHtml(season.InfosPrepareSeason);
            vm.infosFinalDay = $sce.trustAsHtml(season.InfosFinalDay);

            if (season) {

                if (season.State === 'Running') {
                    matchService.queryUpcommingMatches().$promise.then(successfullyLoadedMatches);
                    matchService.queryRecentMatches().$promise.then(successfullyLoadedRecentMatches);
                }

                if (season.State === 'FinalDay') {
                    finalDayMatchService.recent({ finalDayId: vm.season.FinalDay.Id }).$promise.then(function (matches) {
                        vm.finalDayRecentMatches = matches.Matches
                    });
                    finalDayMatchService.upcomming({ finalDayId: vm.season.FinalDay.Id }).$promise.then(function (matches) {
                        vm.finalDayUpcommingMatches = matches.Matches;
                    });
                    vm.finalDayRunningMatches = finalDayMatchService.running({ finalDayId: vm.season.FinalDay.Id });
                }

            }
        }

        function init() {
            shortNewsService.query({ PageSize: 3 }).$promise.then(function (news) {
                vm.news = news;

                if (news.length > 0) {
                    var latestNewsEntry = news[0];

                    var diffDays = getNumberOfDaysSinsceNewsPost(latestNewsEntry);

                    if (diffDays < 5) {
                        vm.breakingnews = latestNewsEntry;
                    }
                }
            });
            seasonService.getCurrent().$promise.then(seasonLoaded);
        }

        function getNumberOfDaysSinsceNewsPost(newsPost) {
            var postDate = new Date(newsPost.PostDate);
            var now = new Date();
            var timeDiff = Math.abs(now.getTime() - postDate.getTime());
            return Math.ceil(timeDiff / (1000 * 3600 * 24));
        }

        init();
    }
})();