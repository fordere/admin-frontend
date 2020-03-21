(function() {
    angular.module('fordere.rest')
        .factory('seasonService', [
            '$resource', 'API_URL', function($resource, API_URL) {
                return $resource(API_URL + 'seasons/:Id', null, {
                    queryArchived: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + "seasons/archived",
                    },
                    getStandings: {
                        method: 'GET',
                        url: API_URL + "seasons/:Id/standings",
                        isArray: true
                    },
                    // TODO: SSH ist getTeams und getLeagues hier richtig oder sind die eher auf dem teamService/leagueService?
                    getTeams: {
                        method: 'GET',
                        url: API_URL + "seasons/:SeasonId/teams",
                        isArray: true
                    },
                    getLeagues: {
                        method: 'GET',
                        url: API_URL + "seasons/:SeasonId/leagues",
                        isArray: true
                    },
                    getCurrent: {
                        method: 'GET',
                        url: API_URL + "seasons/current",
                        isArray: false
                    },
                    getById: {
                        method: 'GET',
                        url: API_URL + "seasons/:Id",
                        isArray: false
                    }
                });
            }
        ]);
})();