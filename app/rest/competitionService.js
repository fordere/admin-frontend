(function () {
    angular.module('fordere.rest')
        .factory('competitionService', [
            '$resource', 'API_URL', function ($resource, API_URL) {
                return $resource(API_URL + 'competitions/:Id', null, {
                    getById: {
                        method: 'GET',
                        url: API_URL + "competitions/:Id",
                        isArray: false
                    },
                    save: {
                        method: 'PUT',
                        url: API_URL + "competitions/:Id",
                        isArray: false
                    },
                    create: {
                        method: 'POST',
                        url: API_URL + "competitions/:Id",
                        isArray: false
                    },
                    register: {
                        method: 'POST',
                        url: API_URL + "competitions/:Id/register",
                        isArray: false
                    },
                    getStandings: {
                        method: 'GET',
                        url: API_URL + "competitions/:Id/standings",
                        isArray: false
                    },
                    queryOpenForRegistration: {
                        method: 'GET',
                        url: API_URL + "competition/open",
                        isArray: true
                    },
                    getTeams: {
                        method: 'GET',
                        url: API_URL + "competitions/:Id/teams",
                        isArray: true
                    },
                    getCompetitionState: {
                        method: 'GET',
                        url: API_URL + "competitions/:Id/state",
                        isArray: false
                    },
                    createTeamsAndMatches: {
                        method: 'POST',
                        url: API_URL + "competitions/:Id/generate",
                    },
                    getBySeasonId: {
                        method: 'GET',
                        url: API_URL + "competitions/season/:Id",
                        isArray: true
                    },
                    getInCurrentSeason: {
                        method: 'GET',
                        url: API_URL + "competitions/season/current",
                        isArray: true
                    },
                    setMatchesToNotPlayed: {
                        // TODO: GET is a hack here, but i'm not sure how to specifiy parameter for the url.
                        method: 'GET',
                        url: API_URL + 'competitions/:Id/updateNotPlayed'
                    }
                });
            }
        ]);
})();