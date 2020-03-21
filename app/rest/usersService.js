(function () {
    angular.module('fordere.rest')
        .factory('usersService', [
            '$resource', 'API_URL', function ($resource, API_URL) {
                return $resource(API_URL + 'users/:id', null, {
                    queryPossiblePartner: {
                        isArray: false,
                        method: 'GET',
                        url: API_URL + 'users/possiblepartner'
                    },
                    find: {
                        method: 'GET',
                        isArray: true,
                        url: API_URL + 'users/find/:query/:competitionId'
                    },
                    update: {
                        method: 'PUT',
                        url: API_URL + 'users'
                    },
                    create: {
                        method: 'POST',
                        url: API_URL + 'users'
                    },
                    query: {
                        isArray: false
                    }
                });
            }
        ]);
})();