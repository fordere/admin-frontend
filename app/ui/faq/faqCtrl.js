(function () {
    'use strict';

    var controllerId = 'fordere.faqCtrl';

    angular.module('fordere')
        .controller(controllerId, ['divisionHolder', faqCtrl]);

    function faqCtrl(divisionHolder) {
        var vm = this;

        vm.isDivision = isDivision;
        vm.getContactMail = getContactMail;

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }

        function getContactMail() {
            // TODO Dynamic?
            if (isDivision(3)) {
                return "info.luzern@fordere.ch";
            }

            return "fordere.ch";
        }
    }
})();