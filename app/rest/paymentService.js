(function () {
    angular.module('fordere.rest')
        .factory('paymentService', [
            '$resource', 'API_URL', function ($resource, API_URL) {
                return $resource(API_URL + 'payments', null, {
                    queryOpen: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + 'payments/open'
                    },
                    queryUserOpen: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + 'payments/open/user'
                    },
                    pay: {
                        isArray: false,
                        method: 'POST',
                        url: API_URL + 'payments/pay'
                    },
                    queryDone: {
                        isArray: true,
                        method: 'GET',
                        url: API_URL + 'payments/done'
                    },
                    getPaymentInformations: {
                        isArray: false,
                        method: 'GET',
                        url: API_URL + 'payments/informations'
                    },
                    queryCurrentUserCurrentSeason: {
                        isArray: false,
                        method: 'GET',
                        url: API_URL + 'payments/currentUserCurrentSeason'
                    },
                    queryPaymentInformations: {
                        isArray: false,
                        method: 'GET',
                        url: API_URL + 'divisions/payment'
                    }
                });
            }
        ]);
})();