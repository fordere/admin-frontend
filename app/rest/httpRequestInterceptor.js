(function () {
    angular.module('fordere.rest')
        .factory('httpRequestInterceptor', ['divisionHolder', function (divisionHolder) {
            return {
                request: function (config) {
                    config.headers['division_id'] = divisionHolder.getSelectedDivision();
                    return config;
                }
            };
        }]);

    angular.module('fordere.rest').config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
    }]);
})();