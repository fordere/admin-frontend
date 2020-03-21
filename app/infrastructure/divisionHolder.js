(function () {

    angular.module('fordere.services').service('divisionHolder', ['$location', divisionHolder]);

    function divisionHolder($location) {
        var vm = this;
        vm.select = select;
        vm.getSelectedDivision = getSelectedDivision;

        function select(divisionId) {
            document.cookie = 'divisionId=' + divisionId + ';domain=fordere.ch';

            if (!window.location.host.startsWith('127.0.0.1')) {
                setTimeout(() => {
                    switch (divisionId) {
                        case 1:
                            window.location.href = 'https://zh.fordere.ch' + location.pathname;
                            break;
                        case 3:
                            window.location.href = 'https://lu.fordere.ch' + location.pathname;
                            break;
                        case 2:
                            window.location.href = 'https://sg.fordere.ch' + location.pathname;
                            break;
                        case 4:
                            window.location.href = 'https://winti.fordere.ch' + location.pathname;
                            break;
                    }
                });
            }
        }

        function getSelectedDivision() {
            return getCurrentDivision();
        }

        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(";").shift();
        }

        function getCurrentDivision() {

            if (window.location.host.startsWith('127.0.0.1')) {
                return 1;
            }

            var parts = window.location.host.split('.');
            if (parts[0] !== 'fordere') {
                switch (parts[0]) {
                    case 'zh':
                        return 1;
                    case 'lu':
                    case 'luzern':
                        return 3;
                    case 'sg':
                        return 2;
                    case 'winti':
                        return 4;

                }
            }

            var divisonId = Number(getCookie('divisionId'));

            if (Number.isNaN(divisonId)) {
                return undefined;
            }

            return divisonId;
        }

        if (getCurrentDivision() === undefined) {

            if (window.location.host.startsWith('127.0.0.1')) {
                this.select(1);
            } else {
                $location.path('/divisionselection');
            }

        } else {

            var parts = window.location.host.split('.');
            if (parts[0] === 'fordere') {
                select(getCurrentDivision());
            }
        }

    }

})();