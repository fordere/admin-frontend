(function () {
  'use strict';

  var controllerId = 'fordere.admin.userDetailCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$location', '$routeParams', 'usersService', 'AuthService', '$http', userDetailCtrl]);

  function userDetailCtrl($location, $routeParams, userService, authService, $http) {
    var vm = this;
    vm.save = save;
    vm.toggleRole = toggleRole;
    vm.hasRole = hasRole;
    vm.isNewUser = $routeParams.id === "0";

    if (!vm.isNewUser) {
      userService.get({ id: $routeParams.id }, function (user) {
        // TODO: Remove this IsAdmin flag -> send array of roles
        user.Roles = [];
        vm.user = user;
        toggleRole('Admin', vm.user.IsAdmin);
      });
    } else {
      vm.user = { Id: 0, Roles: [] };
    }

    function save() {
      if (!vm.isNewUser) {
        vm.user.$update(function () {
          $location.path('/admin/users');
        });
      } else {
        userService.create(vm.user, function () {
          $location.path('/admin/users');
        });
      }
    }

    function toggleRole(role, value) {
      if (value) {
        vm.user.Roles.push(role);
      } else if (hasRole(role)) {
        vm.user.Roles.splice(vm.user.Roles.indexOf(role), 1);
      }
    }

    function hasRole(role) {
      if (!vm.user) {
        return false;
      }
      return vm.user.Roles.indexOf(role) >= 0;
    }
  }

})();