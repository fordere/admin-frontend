(function () {
  angular.module('fordere.rest')
  .factory('finalDayTableService', [
    '$resource', 'API_URL', function ($resource, API_URL) {
      return $resource(API_URL + 'finalday/tables/:Id', { Id: '@Id' }, {
        getAll: {
          isArray: true,
          method: 'GET',
          url: API_URL + 'finalday/tables'
        },
        updateNumber: {
          isArray: false,
          method: 'POST',
          url: API_URL + 'finalday/tables/:Id/number'
        },
        updateDisabled: {
          isArray: false,
          method: 'POST',
          url: API_URL + 'finalday/tables/:Id/disabled'
        },
        add: {
          isArray: false,
          method: 'POST',
          url: API_URL + 'finalday/tables'
        }
      });
    }
  ]);
})();
