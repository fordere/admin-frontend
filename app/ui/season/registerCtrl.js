(function () {
    'use strict';

    var controllerId = 'fordere.registerCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$scope', 'competitionService', '$sce', 'AuthService', 'teamInscriptionService', 'seasonService', 'paymentService', registerCtrl]);

    function registerCtrl($scope, competitionService, sce, authService, teamInscriptionService, seasonService, paymentService) {
        var vm = this;

        vm.season = seasonService.getCurrent();
        vm.isAdmin = authService.isAdmin;

        vm.getCompetitionDescription = getCompetitionDescription;
        vm.getRegistrationState = getRegistrationState;
        vm.getPartnerName = getPartnerName;
        vm.isAuthenticated = authService.isAuthenticated;
        vm.hasRegisteredForAnyCompetition = hasRegisteredForAnyCompetition;

        if (vm.isAuthenticated()) {
            paymentService.queryUserOpen().$promise.then(function (payments) {
                vm.hasOpenPayments = payments.length > 0;
            });
        }

        $scope.$watch(function () { return authService.isAuthenticated(); }, function () {
            loadInscriptions();
        });

        function hasRegisteredForAnyCompetition() {
            if (vm.possibleCompetitions) {
                return vm.possibleCompetitions.find(x => x.CurrentUserTeamInscription !== undefined) !== undefined;
            }

            return false;
        }

        function getPartnerName(competitionId) {
            var competition = _.find(vm.possibleCompetitions, function (comp) { return comp.Id === competitionId; });

            if (competition && competition.CurrentUserTeamInscription) {

                var player = competition.CurrentUserTeamInscription.Player2;

                if (authService.getAuthenticatedUser().Id === competition.CurrentUserTeamInscription.Player2Id) {
                    player = competition.CurrentUserTeamInscription.Player1;
                }

                return player.FirstName + ' ' + player.LastName;
            }

            return null;
        }

        function getRegistrationState(competitionId) {
            var competition = _.find(vm.possibleCompetitions, function (comp) { return comp.Id === competitionId; });

            if (competition && competition.CurrentUserTeamInscription) {
                return "ready";
            }

            if (vm.season.State !== "Registration") {
                return "closed";
            }

            return "open";
        }

        function getCompetitionDescription(competition) {
            return sce.trustAsHtml(competition.RegistrationText);
        }

        function loadInscriptions() {
            competitionService.queryOpenForRegistration().$promise.then(successfullyLoaded);

            function successfullyLoaded(result) {
                vm.possibleCompetitions = result;
            }
        }

        loadInscriptions();
    }
})();
