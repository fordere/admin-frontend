(function() {
    'use strict';

    var controllerId = 'fordere.admin.seasonCtrl';

    angular.module('fordere')
        .controller(controllerId, ['seasonService', seasonCtrl]);

    function seasonCtrl(seasonService) {
        var vm = this;

        vm.seasons = seasonService.query();
        vm.getStateName = getStateName;

        vm.seasonStates = [
            { Key: 'PrepareRegistration', Name: 'Vorbereitung Anmeldung' },
            { Key: 'Registration', Name: 'Anmeldephase' },
            { Key: 'PrepareSeason', Name: 'Vorbereitung Saisonstart' },
            { Key: 'EinteilungReady', Name: 'Einteilung abgeschlossen' },
            { Key: 'Running', Name: 'Spielbetrieb' },
            { Key: 'PrepareFinalDay', Name: 'Vorbreitung Finaltag' },
            { Key: 'FinalDay', Name: 'Finaltag' },
            { Key: 'Archived', Name: 'Archiviert' },
        ];

        function getStateName(key) {
            var item = vm.seasonStates.filter(function(x) {
                return x.Key === key;
            })[0];

            return item.Name;
        }
    }

})();