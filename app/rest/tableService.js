(function () {
    angular.module('fordere.rest')
        .factory('tableService', [
            '$resource', 'API_URL', function ($resource, API_URL) {
                return $resource(API_URL + 'tables/:TableId', { TableId: '@TableId', BarId: '@BarId' }, {
                    getPossibleTimeSlots: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + "tables/:TableId/:Day/timeslots"
                    },
                    getTablesInBarForCompetition: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + "bar/tables/:BarId/competition/:CompetitionId"
                    },
                    getTablesInBar: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + "bar/:BarId/tables"
                    },
                    getTablesInBarForCup: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + "bar/tables/:BarId/cup/:CupId"
                    },
                    getAllTables: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + "tables"
                    },
                    getAvailabilities: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + 'tables/:TableId/availabilities'
                    },
                    addAvailability: {
                        isArray: false,
                        method: 'PUT',
                        url: API_URL + 'tables/:TableId/availabilities'
                    },
                    deleteAvailability: {
                        isArray: false,
                        method: 'DELETE',
                        url: API_URL + 'tables/:TableId/availabilities'
                    },
                    create: {
                        method: 'POST'
                    },
                    save: {
                        method: 'PUT'
                    }
                });
            }
        ]);
})();