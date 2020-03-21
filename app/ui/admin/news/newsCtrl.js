(function() {
  'use strict';

  var controllerId = 'fordere.admin.newsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', 'newsService', newsAdminCtrl]);

  function newsAdminCtrl($location, newsService) {
    var vm = this;
    vm.news = newsService.query();
    vm.createNews = createNews;

    vm.navigateToDetail = navigateToDetail;

    function navigateToDetail(id) {
      $location.path('/admin/news/' + id);
    }

    function createNews() {
      $location.path('/admin/news/0');
    }
  }
})();