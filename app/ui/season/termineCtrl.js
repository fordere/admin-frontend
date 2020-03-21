(function () {
    'use strict';

    var controllerId = 'fordere.termineCtrl';

    angular.module('fordere')
        .controller(controllerId, ['seasonService', '$sce', termineCtrl]);

    function termineCtrl(seasonService, $sce) {
        var vm = this;

        seasonService.getCurrent().$promise.then(season => {
            vm.dates = $sce.trustAsHtml(season.Dates);
            vm.seasonName = season.Name;
        });
    }
})();

