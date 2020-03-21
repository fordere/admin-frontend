(function () {
    var controllerId = 'fordere.registerdetailCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$sce', 'barService', 'usersService', '$routeParams', '$location', 'competitionService', 'AuthService', 'divisionHolder', 'toastr', registerdetailCtrl]);

    function registerdetailCtrl(sce, barService, usersService, $routeParams, $location, competitionService, authService, divisionHolder, toastr) {
        var vm = this;

        vm.hasAnyPhoneNumber = hasAnyPhoneNumber;
        vm.submitInscription = submitInscription;
        vm.getCompetitionDescription = getCompetitionDescription;
        vm.isAuthenticated = isAuthenticated;
        vm.getPlayers = getPlayers;
        vm.inscription = {
            LeagueRegistrationId: $routeParams.id,
            LeagueWish: 0
        };

        var player2 = undefined;

        Object.defineProperty(this, 'player2', {
            get: function () { return player2; },
            set: function (newValue) {
                player2 = newValue;
                if (newValue) {
                    vm.inscription.Player2Id = newValue.Id;
                } else {
                    vm.inscription.Player2Id = undefined;
                }
            }
        });

        function isAuthenticated() {
            return authService.isAuthenticated();
        }

        function getPlayers(query) {
            return usersService.find({ query: query, competitionId: vm.inscription.LeagueRegistrationId }).$promise.then((result) => {
                return result;
            });
        }

        function hasAnyPhoneNumber() {
            if (vm.inscription.Player2Id === undefined) {
                return true;
            }

            var user = authService.getAuthenticatedUser();
            return (player2.PhoneNumber !== undefined && player2.PhoneNumber.length > 8) || (user.PhoneNumber !== undefined && user.PhoneNumber.length > 8);
        }

        function getCompetitionDescription() {
            if (vm.competition) {
                return sce.trustAsHtml(vm.competition.RegistrationText);
            }
            return null;
        }

        function submitInscription() {
            competitionService.register({ Id: vm.competition.Id }, vm.inscription).$promise.then(successfullySaved).catch(regFail);

            function successfullySaved() {
                if (divisionHolder.getSelectedDivision() === 2) {
                    toastr.success('Anmeldung erfolgreich');
                    $location.path('/');
                } else {
                    $location.path('/season');
                }

            }

            function regFail() {
                vm.registerError = 'Anmeldung fehlgeschlagen. Hast du dich vielleicht bereits angemeldet?'
            }
        }

        function init() {
            loadPossibleBars();
            loadCompetition();
        }

        function loadCompetition() {
            vm.competition = competitionService.get({ Id: $routeParams.id });
        }

        function loadPossibleBars() {
            barService.getPlayableBars().$promise.then(successfullyLoaded);

            function successfullyLoaded(result) {
                vm.possibleBars = result;
            }
        }

        init();
    }
})();