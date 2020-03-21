(function() {
  'use strict';

  var controllerId = 'fordere.threadListCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', 'forumService', threadListCtrl]);

  function threadListCtrl($location, forumService) {
    var vm = this;

    vm.threads = forumService.query();
    vm.navigateToDetail = navigateToDetail;
    vm.navigateToNewThread = navigateToNewThread;

    function navigateToDetail(id) {
      console.log('/forum/thread/' + id);
      $location.path('/forum/thread/' + id);
    }

    function navigateToNewThread() {
      $location.path('/forum/new');
    }
  }
})();