(function () {
    var controllerId = 'fordere.indexCtrl';
    angular.module('fordere').controller(controllerId, ['$location', 'divisionHolder', indexCtrl]);

    // TODO SSH divisionHolder wird hier injected damit der konstruktor immer ausgeüfhrt wird und falls noch keine divison gesetzt wird auf die
    // divisionselection-seite navigiert wird. Dies sollten wir anders lösen. 
    function indexCtrl($location, divisionHolder) {
        var vm = this;

        vm.isFullScreenMode = isFullScreenMode;
        vm.isDivision = isDivision;

        function isFullScreenMode() {
            return $location.path().indexOf('divisionselection') !== -1 || $location.path().indexOf('index') !== -1;
        }

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }
    }
})();