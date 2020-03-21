(function () {
    'use strict';

    var controllerId = 'fordere.barCtrl';

    angular.module('fordere')
        .controller(controllerId, ['barService', 'leafletData', barCtrl]);

    function barCtrl(barService, leafletData) {

        var vm = this;

        vm.barMarker = [];

        barService.getPlayableBars().$promise.then(bars => {
            vm.bars = bars;
            bars.forEach(bar => {
                vm.barMarker.push({
                    lat: bar.Latitude,
                    lng: bar.Longitude,
                    message: bar.Name,
                    id: bar.Id,
                    icon: createIcon()
                });
            });

            if (vm.barMarker.length > 0) {
                leafletData.getMap().then(map => {
                    map.fitBounds(vm.barMarker);
                });
            }
        });

        function createIcon() {
            return {
                iconUrl: 'assets/images/map-marker.png',
                shadowUrl: 'assets/images/map-marker-shadow.png',
                iconSize: [25, 41],
                shadowSize: [41, 41],
                iconAnchor: [12, 41],
                shadowAnchor: [20, 41],
                popupAnchor: [0, -57]
            }
        }
    }
})();