(function () {

    angular.module('fordere.services').service('divisionHolder', [divisionHolder]);

    function divisionHolder() {
        var vm = this;
        vm.select = select;
        vm.getSelectedDivision = getSelectedDivision;


        function select(divisionId) {
            localStorage.setItem('divisionId', divisionId);
        }

        function getSelectedDivision() {
            return getCurrentDivision();
        }

        function getCurrentDivision() {
            var divisonId = Number(localStorage.getItem('divisionId'));

            if (Number.isNaN(divisonId)) {
                return undefined;
            }

            return divisonId;
        }

        if (getCurrentDivision() === undefined) {
            this.select(1);
        } else {
            select(getCurrentDivision());
        }

    }

})();
