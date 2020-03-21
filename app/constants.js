(function () {
    'use strict';

    angular.module('fordere.constants')

        .constant('DATETIMEFORMAT', 'dd.MM.yy HH:mm')
        .constant('DATEFORMAT', 'dd.MM.yy')
        .constant('API_URL', document.domain.indexOf('fordere.ch') > -1 ? 'https://' + document.domain + '/api/v1/' : 'http://127.0.0.1:1337/');

})();