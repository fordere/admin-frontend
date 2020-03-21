(function() {
    'use strict';

    var controllerId = 'fordere.admin.seasonDetailCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$routeParams', 'seasonService', '$location', seasonDetailCtrl]);

    function seasonDetailCtrl($routeParams, seasonService, $location) {
        var vm = this;

        if ($routeParams.id != 0) {
            vm.season = seasonService.getById({ Id: $routeParams.id });
        } else {
            vm.season = { Id: 0, Name: "Neue Saison", State: 'PrepareRegistration' };
        }

        vm.save = save;
        vm.gotoList = gotoList;

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

        function save() {
            seasonService.save({ Id: vm.season.Id }, vm.season).$promise.then(() => vm.gotoList());
        }

        function gotoList() {
            $location.path('/admin/seasons/');
        }

    }

})();