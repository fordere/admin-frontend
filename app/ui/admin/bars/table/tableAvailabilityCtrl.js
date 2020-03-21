(function () {
  'use strict';

  var controllerId = 'fordere.admin.tableAvailabilityCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'tableService', 'toastr', tableAvailabilityCtrl]);

  function tableAvailabilityCtrl($routeParams, tableService, toastr) {
    var vm = this;

    vm.addAvailability = addAvailability;
    vm.deleteAvailability = deleteAvailability;

    initAvailabilityToAdd();
    initPossibleTimeSlots();
    initAvailabilities();
    initSelectedTable();

    function initSelectedTable() {
      tableService.get({ TableId: $routeParams.id }, successfullyLoaded);

      function successfullyLoaded(result) {
        vm.selectedTable = result;
      }
    }

    function initPossibleTimeSlots() {
      vm.possibleTimeSlots = [];

      for (var hour = 0; hour < 24; hour++) {
        vm.possibleTimeSlots.push(new Date(0, 0, 0, hour, 0, 0));
        vm.possibleTimeSlots.push(new Date(0, 0, 0, hour, 30, 0));
      }
    }

    function initAvailabilities() {
      vm.availabilities = tableService.getAvailabilities({ TableId: $routeParams.id });
    }

    function addAvailability() {
      tableService.addAvailability(vm.availabilityToAdd, successfullyAdded, errorAdding);

      function successfullyAdded(result) {
        toastr.success('Erfolgreich hinzugefügt!');
        vm.availabilities.push(result);

        initAvailabilityToAdd();
      }

      function errorAdding() {
        toastr.error('Speichern fehlgeschlagen!');
      }
    }

    function initAvailabilityToAdd() {
      vm.availabilityToAdd = { TableId: $routeParams.id };
    }

    function deleteAvailability(availabilityId) {
      tableService.deleteAvailability({ TableId: $routeParams.id, TableAvailabilityId: availabilityId }, successfullyDeleted, errorDeleting);

      function successfullyDeleted() {
        toastr.success('Erfolgreich gelöscht!');

        vm.availabilities = vm.availabilities.filter(function (x) {
          return x.Id !== availabilityId;
        });
      }

      function errorDeleting() {
        toastr.error('Löschen fehlgeschlagen!');
      }
    }
  }
})();