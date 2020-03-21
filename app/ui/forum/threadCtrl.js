(function () {
  'use strict';

  var controllerId = 'fordere.threadCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$scope','$routeParams', 'forumService', '$sce', 'AuthService', threadCtrl]);

  function threadCtrl($scope, $routeParams, forumService, $sce, authService) {
    var vm = this;

    vm.createNewPost = createNewPost;

   vm.posts = [];

    init();

    function init() {
      loadPosts();
      loadCurrentThread();

      $scope.$watch(function () {
        return authService.isAuthenticated().Id;
      }, function () {
        vm.isAuthenticated = authService.isAuthenticated();
      });
    }

    function loadPosts() {
      forumService.queryPostsForThread({ Id: $routeParams.ThreadId }, postsLoaded);

      function postsLoaded(posts) {
        for (var i = 0; i < posts.length; i++) {
          posts[i].saveText = $sce.trustAsHtml(posts[i].Text);
        }

        vm.posts = posts;
      }
    }

    function loadCurrentThread() {
      forumService.getThread({ Id: $routeParams.ThreadId }, threadLoaded);

      function threadLoaded(result) {
        vm.thread = result;
      }
    }

    function createNewPost() {
      forumService.createNewPost({ ForumThreadId: $routeParams.ThreadId, Text: vm.answer }, function (result) {
        result.saveText = $sce.trustAsHtml(result.Text);
        vm.posts.push(result);

        vm.answer = '';
      });
    }

  }
})();