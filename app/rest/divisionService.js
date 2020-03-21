(function () {
    angular.module('fordere.rest')
        .factory('divisionService', [
            '$resource', 'API_URL', function ($resource, API_URL) {
                return $resource(API_URL + 'divisions/:Id');
            }
        ]);
})();