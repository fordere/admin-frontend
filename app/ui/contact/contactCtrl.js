(function () {
    'use strict';

    var controllerId = 'fordere.contactCtrl';

    angular.module('fordere')
        .controller(controllerId, ['contactService', 'divisionHolder', contactCtrl]);

    function contactCtrl(contactService, divisionHolder) {
        var vm = this;
        vm.data = {};
        vm.sendData = sendData;
        vm.feedbackSendSuccessfull = false;
        vm.feedbackSendError = false;
        vm.isDivision = isDivision;

        function isDivision(divisionId) {
            return divisionHolder.getSelectedDivision() === divisionId;
        }

        function sendData() {

            contactService.save(vm.data).$promise.then(successfullySaved, errorSave);

            function successfullySaved() {
                vm.data = {};
                vm.feedbackSendSuccessfull = true;
                vm.feedbackSendError = false;

                //reCaptcha.reload();
            }

            function errorSave(result) {
                vm.feedbackSendSuccessfull = false;
                vm.feedbackSendError = true;

                //reCaptcha.reload();
            }
        }
    }
})();