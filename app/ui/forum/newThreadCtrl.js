(function () {
  'use strict';

  var controllerId = 'fordere.newThreadCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$scope', '$location', 'forumService', '$sce', 'AuthService', newThreadCtrl]);

  function newThreadCtrl($scope, $location, forumService, $sce, authService) {
    var vm = this;

    vm.createNewThread = createNewThread;

    function createNewThread() {
      forumService.createNewThread(vm.thread, function (result) {
        $location.path('/forum/thread/' + result.ForumThreadId);
      });
    }

    $scope.$watch(function () {
      return authService.isAuthenticated().Id;
    }, function () {
      vm.isAuthenticated = authService.isAuthenticated();
    });
  }
})();