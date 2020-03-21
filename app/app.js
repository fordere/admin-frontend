(function () {
    angular.module('fordere.constants', []);
    angular.module('fordere.directives', ['ngStorage']);
    angular.module('fordere.filter', []);
    angular.module('fordere.rest', ['ngResource']);
    angular.module('fordere.services', ['fordere.constants', 'fordere.rest', 'ngStorage', 'ngCookies']);
    angular.module('fordere', ['ngRoute', 'ui.bootstrap', 'fordere.config', 'fordere.constants', 'fordere.filter', 'fordere.directives', 'fordere.services', 'fordere.rest', 'as.sortable', 'vcRecaptcha', 'ng-breadcrumbs', 'textAngular', 'angulartics', 'angulartics.google.analytics', 'chart.js', 'stripe.checkout', 'ui-leaflet']);

    angular.module('fordere')
        .config(['$httpProvider', function ($httpProvider) {
            // TODO: dont send token to stripe x)
            $httpProvider.interceptors.push('bearerTokenInterceptor');
        }])
        .run([
            '$rootScope', function ($rootScope) {
                $rootScope.currentYear = new Date().getFullYear();
            }
        ]);

})();
