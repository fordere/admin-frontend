(function() {
  'use strict';

  var controllerId = 'fordere.newsListCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', 'newsService', newsListCtrl]);

  function newsListCtrl($location, newsService) {
    var vm = this;
    vm.news = newsService.query();

    vm.navigateToDetail = navigateToDetail;

    function navigateToDetail(id) {
      $location.path('/news/' + id);
    }
  }
})();