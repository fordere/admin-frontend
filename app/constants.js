(function () {
    'use strict';

    angular.module('fordere.constants')

        .constant('DATETIMEFORMAT', 'dd.MM.yy HH:mm')
        .constant('DATEFORMAT', 'dd.MM.yy')
        .constant('API_URL', document.domain.indexOf('fordere.ch') > -1 ? '/api/v1/' : '/api/');

})();
