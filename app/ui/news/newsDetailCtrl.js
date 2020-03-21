(function() {
  'use strict';

  var controllerId = 'fordere.newsDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'newsService', '$sce', newsDetailCtrl]);

  function newsDetailCtrl($routeParams, newsService, $sce) {
    var vm = this;
    vm.news = newsService.get({ Id: $routeParams.id }, function() {
      vm.newsContent = $sce.trustAsHtml(vm.news.Content);
    });
  }
})();