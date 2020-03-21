(function () {
    'use strict';

    var controllerId = 'fordere.admin.newsDetailCtrl';

    angular.module('fordere')
        .controller(controllerId, ['$location', '$routeParams', 'newsService', 'AuthService', 'divisionService', newsDetailAdminCtrl]);

    function newsDetailAdminCtrl($location, $routeParams, newsService, authService, divisionService) {
        var vm = this;
        vm.save = save;
        vm.divisions = divisionService.query();
        vm.datepickerOpened = false;
        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.datepickerOpened = true;
        };

        if ($routeParams.id == 0) {
            vm.news = { Id: 0, IsPublished: false, UserAuthId: authService.getAuthenticatedUser().Id, PostDate: new Date(), Title: 'Titel' };

            // direct pageload, authenticatedUser is not yet available -> retry when promise is there.
            if (vm.news.UserAuthId == undefined) {
                authService.getAuthenticatedUser().$promise.then(function () {
                    vm.news.UserAuthId = authService.getAuthenticatedUser().Id;
                });
            }

        } else {
            vm.news = newsService.get({ Id: $routeParams.id });
        }
        function save() {
            if (vm.news.Id != 0) {
                vm.news.$save(function () {
                    $location.path('/admin/news');
                });
            } else {
                // wtf, mega hack // Move to server...
                vm.news.UserAuthId = authService.getAuthenticatedUser().Id;
                vm.news.IsPublished = true;
                vm.news.PostDate = new Date();

                newsService.create(vm.news, function () {
                    $location.path('/admin/news');
                });
            }
        }

    }

})();