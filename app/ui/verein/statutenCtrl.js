(function () {
    'use strict';

    var controllerId = 'fordere.statutenCtrl';

    angular.module('fordere')
        .controller(controllerId, ['divisionHolder', statutenCtrl]);


    function statutenCtrl(divisionHolder) {
        var vm = this;

        vm.isDivision = isDivision;

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }
    }
})();
