(function () {
  angular.module('fordere.rest')
    .factory('mailingListService', [
      '$resource', 'API_URL', function($resource, API_URL) {
        return $resource('', null, {
          getMailsBySeason: {
            method: 'GET',
            url: API_URL + "mailinglist/season/:Id",
            isArray: false
          },
          getMailsByCompetition: {
            method: 'GET',
            url: API_URL + "mailinglist/competition/:Id",
            isArray: false
          },
          getMailsByLeague: {
            method: 'GET',
            url: API_URL + "mailinglist/league/:Id",
            isArray: false
          },
          getMailsForAll: {
            method: 'GET',
            url: API_URL + "mailinglist/allusers",
            isArray: false
          },
        });
      }
    ]);
})();