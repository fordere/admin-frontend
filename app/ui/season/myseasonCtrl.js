(function () {
    'use strict';

    var controllerId = 'fordere.myseasonCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$q', '$scope', '$filter', 'matchService', 'barService', 'toastr', 'AuthService', 'competitionService', 'cupService', 'tableService', '$rootScope', 'leagueService', 'paymentService', 'seasonService', '$sce', 'divisionHolder', myseasonCtrl]);

    function myseasonCtrl($q, $scope, $filter, matchService, barService, toastr, authService, competitionService, cupService, tableService, $rootScope, leagueService, paymentService, seasonService, $sce, divisionHolder) {

        var vm = this;

        seasonService.getCurrent().$promise.then(season => {
            vm.season = season;
            vm.dates = $sce.trustAsHtml(season.Dates);
        });

        // Public functions
        vm.isHomeMatch = isHomeMatch;
        vm.isPlannedMatch = isPlannedMatch;
        vm.isPlayedMatch = isPlayedMatch;
        vm.getOpponentTeamName = getOpponentTeamName;
        vm.getOpponentTeamWishPlayDay = getOpponentTeamWishPlayDay;
        vm.getOpponentTeamId = getOpponentTeamId;
        vm.openMatchMails = [];
        vm.getProgressClass = getProgressClass;
        vm.getProgressDifference = getProgressDifference;
        vm.isDivision = isDivision;

        vm.isWin = isWin;
        vm.isDraw = isDraw;
        vm.isLoss = isLoss;
        vm.getResult = getResult;
        vm.isCurrentCupRoundMatch = isCurrentCupRoundMatch;
        vm.isForfaitMatch = isForfaitMatch;

        //DatePicker shit
        vm.format = 'dd.MM.yyyy';
        vm.initDate = new Date();
        vm.openDatePicker = openDatePicker;

        // Enter result
        vm.enterResult = enterResult;
        vm.isValidResult = isValidResult;
        vm.saveResult = saveResult;

        // Delete result
        vm.deleteResult = deleteResult;
        vm.canDeleteResult = canDeleteResult;

        // Arrange match
        vm.arrangeMatch = arrangeMatch;
        vm.saveArrangeMatch = saveArrangeMatch;
        vm.hasPlayTimeSet = hasPlayTimeSet;

        // Cancel match
        vm.cancelMatch = cancelMatch;

        // Cup
        vm.isCurrentCupRoundDeadlineNear = isCurrentCupRoundDeadlineNear;

        // Public properties
        vm.progress = {
            percent: 0,
            total: 0,
            played: 0
        };

        vm.progressdays = {
            percent: 0,
            total: 0,
            gone: 0
        }

        vm.ignoreOpeningHours = false;

        $scope.$watch(function () {
            return vm.ignoreOpeningHours;
        }, refreshPossibleTimes);

        $scope.$watch(function () {
            return authService.isAuthenticated().Id;
        }, function () {
            vm.isAuthenticated = authService.isAuthenticated();

            if (vm.isAuthenticated) {
                init();
            }
        });

        $scope.$watch(function () {
            if (vm.editingMatch) {
                return vm.editingMatch.BarId;
            }
            return null;
        }, refreshPossibleTables);

        $scope.$watch(function () {
            if (vm.editingMatch) {
                return vm.editingMatch.PlayDatePicker;
            }
            return null;
        }, refreshPossibleTables);

        $scope.$watch(function () {
            if (vm.editingMatch) {
                return vm.editingMatch.TableId;
            }
            return null;
        }, refreshPossibleTimes);

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }

        function isForfaitMatch(match) {
            return match.HomeTeamIsForfaitOut || match.GuestTeamIsForfaitOut;
        }

        function hasPlayTimeSet() {
            return vm.editingMatch && vm.editingMatch.PlayDate;
        }

        // Public functions implementation
        function canDeleteResult(match) {
            var today = new Date();
            var resultDate = new Date(match.ResultDate);
            var diffMs = (resultDate - today);

            // 1200000 -> 20 Minuten
            return Math.abs(diffMs) <= 1200000;
        }

        function isCurrentCupRoundDeadlineNear() {
            return true;
        }

        function cancelMatch(match) {

            match.BarId = undefined;
            match.PlayDate = undefined;
            match.PlayDatePicker = undefined;

            matchService.deleteAppointment({ Id: match.Id }, successfullySaved, errorSave);

            function successfullySaved() {
                var opponentTeamName = getOpponentTeamName(match);
                toastr.success('Spiel gegen ' + opponentTeamName + ' abgesagt!');
                $rootScope.$broadcast('event:mymatches-changed');

                if (match.LeagueId > 0) {
                    loadMailForLeague(match.LeagueId);
                }
            }

            function errorSave() {
                toastr.error('Spiel konnte nicht abgesagt werden! Versuch es später nochmals!');
            }
        }

        function isPlayedMatch(match) {
            return match.HomeTeamScore != undefined && !match.IsNotPlayedMatch;
        }

        function deleteResult(match) {

            match.HomeTeamScore = undefined;
            match.GuestTeamScore = undefined;

            matchService.deleteResult({ Id: match.Id }, successfullyDeleted, errorDelete);

            function successfullyDeleted() {
                toastr.success('Resultat wurde gelöscht!');

                var competition = findCompetitionForMatch(match);
                if (!competition.isCup) {
                    competition.playedMatches = _.filter(competition.playedMatches, function (m) {
                        return m.Id !== match.Id;
                    });

                    competition.openMatches.push(match);
                };

                updateProgress();
            }

            function errorDelete() {
                toastr.error('Resultat konnte nicht gelöscht werden!');
            }
        }

        function saveArrangeMatch() {
            matchService.enterAppointment(vm.editingMatch, successfullySaved, errorSave);

            function successfullySaved(savedMatch) {
                $('#arrangeGame').modal('hide');

                vm.editingMatch.BarName = savedMatch.BarName;
                angular.copy(vm.editingMatch, vm.pristineEditingMatch);

                if (vm.editingMatch.LeagueId > 0) {
                    loadMailForLeague(vm.editingMatch.LeagueId);
                }

                vm.editingMatch = undefined;
                $rootScope.$broadcast('event:mymatches-changed');
            }

            function errorSave() {
                toastr.error('Match konnte nicht resereviert werden! Versuschs nochmal!');
            }
        }

        function openDatePicker($event) {
            $event.stopPropagation();
            vm.isDatePickerOpen = true;
        }

        function saveResult(match) {
            matchService.saveResult(match, successfullySaved, saveError);

            function successfullySaved(savedMatch) {
                $('#enterResult').modal('hide');

                angular.copy(vm.editingMatch, vm.pristineEditingMatch);

                vm.editingMatch = undefined;

                var competition = findCompetitionForMatch(savedMatch);
                if (!competition.isCup) {
                    competition.openMatches = _.filter(competition.openMatches, function (m) {
                        return m.Id !== savedMatch.Id;
                    });

                    competition.playedMatches.push(savedMatch);
                };

                updateProgress();
            }

            function saveError(error) {
                toastr.error('Resultat konnte nicht eingetragen werden! <br /> ' + error.data.ResponseStatus.Message);
            }
        }

        function findCompetitionForMatch(match) {
            return _.find(vm.competitions, function (comp) {

                var isInOpenMatches = _.find(comp.openMatches, function (m) {
                    return m.Id === match.Id;
                });

                var isInPlayedMatches = _.find(comp.playedMatches, function (m) {
                    return m.Id === match.Id;
                });

                return isInOpenMatches || isInPlayedMatches;
            });
        }

        function isValidResult(match) {
            if (!match) {
                return false;
            }
            return match.HomeTeamScore > match.GuestTeamScore || match.GuestTeamScore > match.HomeTeamScore;
        }

        function arrangeMatch(match) {
            $('#arrangeGame').appendTo('body').modal('show');

            vm.ignoreOpeningHours = false;
            vm.noTableAvailable = false;
            vm.noTimeSlotsFound = false;
            vm.possibleTimeSlots = [];
            vm.possibleTables = [];
            vm.editingMatch = angular.copy(match);
            vm.pristineEditingMatch = match;
        }

        function enterResult(match) {
            $('#enterResult').appendTo('body').modal('show');

            vm.editingMatch = angular.copy(match);
            vm.pristineEditingMatch = match;

            var competition = findCompetitionForMatch(match);
            if (competition.isCup) {
                vm.possibleGoalCounts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                vm.maxGoalCount = 10;
            } else {
                vm.possibleGoalCounts = [0, 1, 2, 3, 4];
                vm.maxGoalCount = 4;
            }
        }

        function isHomeMatch(match) {

            if (!match) {
                return false;
            }

            return match.HomePlayer1Id == getCurrentUserId() || match.HomePlayer2Id == getCurrentUserId();
        }

        function getCurrentUserId() {
            return authService.getAuthenticatedUser().Id;
        }

        function isPlannedMatch(match) {
            return match.PlayDate != undefined;
        }

        function isWin(match) {
            if (isHomeMatch(match)) {
                return match.HomeTeamScore > match.GuestTeamScore;
            }

            return match.GuestTeamScore > match.HomeTeamScore;
        }

        function isDraw(match) {
            return match.GuestTeamScore === match.HomeTeamScore;
        }

        function isLoss(match) {
            if (isHomeMatch(match)) {
                return match.GuestTeamScore > match.HomeTeamScore;
            }

            return match.HomeTeamScore > match.GuestTeamScore;
        }

        function getResult(match) {
            if (isHomeMatch(match)) {
                return match.HomeTeamScore + ':' + match.GuestTeamScore;
            }

            return match.GuestTeamScore + ':' + match.HomeTeamScore;
        }

        // Private functions implementation 

        function getOpponentTeamName(match) {
            if (isHomeMatch(match)) {
                return match.GuestTeamName;
            }
            return match.HomeTeamName;
        }

        function getOpponentTeamWishPlayDay(match) {
            if (isHomeMatch(match)) {
                return getFormattedMatchDay(match.GuestTeamWishPlayDay);
            }

            return getFormattedMatchDay(match.HomeTeamWishPlayDay)
        }

        function getFormattedMatchDay(matchDay) {
            if (matchDay === '' || matchDay === undefined) {
                return "Nicht angegeben";
            }

            return matchDay;
        }

        function refreshPossibleTables() {
            if (vm.editingMatch && vm.editingMatch.BarId && vm.editingMatch.PlayDatePicker) {

                vm.possibleTimeSlots = [];
                vm.possibleTables = [];
                vm.noTimeSlotsFound = false;
                vm.noTableAvailable = false;
                vm.editingMatch.TableId = undefined;

                var params = { BarId: vm.editingMatch.BarId };
                var competition = findCompetitionForMatch(vm.editingMatch);
                if (competition.isCup) {
                    params.CupId = competition.CupId;
                    tableService.getTablesInBarForCup(params, tablesLoaded);
                } else {
                    params.CompetitionId = competition.Id;
                    tableService.getTablesInBarForCompetition(params, tablesLoaded);
                }
            }
        }

        function tablesLoaded(tables) {
            vm.possibleTables = tables;

            if (vm.possibleTables.length === 1) {
                vm.editingMatch.TableId = vm.possibleTables[0].Id;
            }
            else if (vm.possibleTables.length === 0) {
                vm.noTableAvailable = true;
            }
        }

        function refreshPossibleTimes() {
            if (vm.editingMatch && vm.editingMatch.TableId && vm.editingMatch.PlayDatePicker) {

                vm.possibleTimeSlots = [];
                vm.editingMatch.PlayDate = undefined;

                if (vm.ignoreOpeningHours) {
                    var date = vm.editingMatch.PlayDatePicker;
                    var possibleTimeSlots = [];
                    for (var i = 0; i < 24; i++) {
                        var fullHourDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), i, 0, 0));
                        possibleTimeSlots.push(new Date(fullHourDate.getTime() + fullHourDate.getTimezoneOffset() * 60000));
                        var halfHourDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), i, 30, 0));
                        possibleTimeSlots.push(new Date(halfHourDate.getTime() + halfHourDate.getTimezoneOffset() * 60000));
                    }
                    vm.possibleTimeSlots = possibleTimeSlots;
                } else {
                    var playDate = $filter('date')(vm.editingMatch.PlayDatePicker, 'yyyy-MM-dd');
                    tableService.getPossibleTimeSlots({ TableId: vm.editingMatch.TableId, Day: playDate }, successfullyLoadedTimeSlots, errorLoadingTImeSlots);
                }
            }
        }

        function successfullyLoadedTimeSlots(result) {
            vm.possibleTimeSlots = result;
            vm.noTimeSlotsFound = vm.possibleTimeSlots.length == 0;
        }

        function errorLoadingTImeSlots() {
            vm.noTimeSlotsFound = true;
        }

        function getOpponentTeamId(match) {
            if (isHomeMatch(match)) {
                return match.GuestTeamId;
            }
            return match.HomeTeamId;
        }

        function updateProgress() {
            vm.progress.played = 0;
            vm.progress.total = 0;

            for (var i = 0; i < vm.competitions.length; i++) {
                var competition = vm.competitions[i];
                vm.progress.played += competition.playedMatches.length;
                vm.progress.total += competition.playedMatches.length + competition.openMatches.length;
            }

            vm.progress.percent = 100 / vm.progress.total * vm.progress.played;
        }

        function loadBars() {
            barService.getPlayableBars().$promise.then(barSuccessfullyLoaded);

            function barSuccessfullyLoaded(result) {
                vm.availableBars = result;
            }
        }

        function isCurrentCupRoundMatch(match) {
            var cup = findCompetitionForMatch(match);
            return match.CupRound === cup.CurrentRound;
        }

        function loadUserMatches() {

            if (!authService.isAuthenticated()) {
                return;
            }

            $q.all([authService.getAuthenticatedUser().$promise, competitionService.query().$promise]).then(function (data) {

                var allCompetitions = data[1];

                matchService.queryUserMatches({ Id: authService.getAuthenticatedUser().Id }, successfullyLoadedMatches, errorLoadingMatches);

                function successfullyLoadedMatches(loadedMatches) {
                    var grouped = _.groupBy(loadedMatches, function (match) { return match.CompetitionId; });

                    var competitions = [];
                    for (var key in grouped) {
                        var allMatches = grouped[key];

                        if (key && key !== 'undefined') {

                            var leagueCompetition = _.find(allCompetitions, function (comp) {
                                return comp.Id == key;
                            });

                            leagueCompetition.openMatches = allMatches.filter(match => !match.IsNotPlayedMatch && !isPlayedMatch(match));
                            leagueCompetition.playedMatches = allMatches.filter(match => isPlayedMatch(match));
                            leagueCompetition.notPlayedMatches = allMatches.filter(match => match.IsNotPlayedMatch);
                            competitions.push(leagueCompetition);

                            if (leagueCompetition.openMatches.length > 0) {
                                loadMailForLeague(leagueCompetition.openMatches[0].LeagueId);
                            }

                        } else {
                            var cupCompetition = { CupId: allMatches[0].CupId, isCup: true };
                            cupCompetition.openMatches = _.where(allMatches, function (match) { return !isPlayedMatch(match); });
                            cupCompetition.playedMatches = _.where(allMatches, function (match) { return isPlayedMatch(match); });
                            cupCompetition.matches = _.sortBy(allMatches, function (match) { return -match.CupRound; });
                            competitions.push(cupCompetition);

                            loadCurrentCupRound(cupCompetition);
                        }
                    }

                    console.log(competitions);

                    vm.competitions = competitions;
                    updateProgress();
                }

                function errorLoadingMatches() {
                    toastr.error('Matches konnten nicht abgerufen werden! Versuch es später nocheinmal!');
                }

            });
        }

        function loadMailForLeague(leagueId) {
            leagueService.getUserMailsForOpenMatches({ Id: leagueId }, function (result) {
                vm.openMatchMails[leagueId] = result.UserMails;
            });
        }

        function loadCurrentCupRound(cupCompetition) {
            cupService.get({ Id: cupCompetition.CupId }, successfullyLoaded);

            function successfullyLoaded(result) {
                cupCompetition.Name = result.Name;
                cupCompetition.CurrentRound = result.CurrentRound;
            }
        }

        function init() {
            loadBars();
            loadUserMatches();
            loadPaymentInfo();
            initTimeProgress();
        }

        function loadPaymentInfo() {
            vm.hasPaymentForCurrentSeason = paymentService.queryCurrentUserCurrentSeason();
        }

        function initTimeProgress() {
            // TODO: Get this stuff from the server season info...
            var start = new Date(2019, 9, 25);
            var end = new Date(2020, 3, 25);
            var today = new Date();

            vm.progressdays.total = getNumberOfDaysBetweenTowDates(end, start);
            vm.progressdays.gone = getNumberOfDaysBetweenTowDates(today, start);
            vm.progressdays.percent = 100.0 / vm.progressdays.total * vm.progressdays.gone;
        }

        function getNumberOfDaysBetweenTowDates(firstDate, secondDate) {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
        }

        function getProgressDifference() {
            return Math.abs(vm.progressdays.percent - vm.progress.percent);
        }

        function getProgressClass() {

            if (vm.progress.percent == 100) {
                return '';
            }

            var difference = getProgressDifference();
            if (difference < 10) {
                return 'progress-bar-success';
            }

            if (difference < 20) {
                return 'progress-bar-warning';
            }

            return 'progress-bar-danger';
        }
    }
})();