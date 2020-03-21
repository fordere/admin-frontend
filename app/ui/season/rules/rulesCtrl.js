(function () {
    'use strict';

    var controllerId = 'fordere.rulesCtrl';

    angular.module('fordere')
        .controller(controllerId, ['competitionService', '$sce', '$routeParams', rulesCtrl]);

    function rulesCtrl(competitionService, sce, $routeParams) {
        var vm = this;

        vm.getCompetitionRules = getCompetitionRules;
        vm.getCompetitionMode = getCompetitionMode;

        function getCompetitionMode() {
            if (vm.competition) {
                return sce.trustAsHtml(vm.competition.Modus);;
            }
            return null;
        }

        function getCompetitionRules() {
            if (vm.competition) {
                return sce.trustAsHtml(vm.competition.Rules);;
            }
            return null;
        }

        function init() {
            vm.competition = competitionService.get({ Id: $routeParams.id});
        }

        init();
    }
})();
