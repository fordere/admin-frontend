(function () {
  angular.module('fordere.rest')
    .factory('forumService', [
      '$resource', 'API_URL', function ($resource, API_URL) {
        return $resource(API_URL + 'forum/:Id', null, {
          'queryPostsForThread': {
            method: 'GET',
            isArray: true
          },
          'createNewPost': {
            method: 'POST',
            url: API_URL + 'forum/posts'
          },
          'createNewThread': {
            method: 'POST',
            url: API_URL + 'forum/threads'
          },
          'getThread': {
            method: 'GET',
            url: API_URL + 'forum/threads/:Id'
          }
        });
      }
    ]);
})();