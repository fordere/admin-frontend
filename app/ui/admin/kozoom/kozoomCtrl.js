(function () {
  'use strict';

  var controllerId = 'fordere.admin.kozoomCtrl';

  angular.module('fordere')
    .controller(controllerId, ['kozoomService', 'toastr', kozoomCtrl]);

  function kozoomCtrl(kozoomService, toastr) {
    var vm = this;
    vm.model = {
      tournamentSoftware: 'sportsoftware',
      key: '2bb76b751c95da330c6beadc585ecb2fd08a91e74e0316ceaeff5f4d5436dc240f6621d2b0547d44da1abc892a8c4d967c9b964c248f77c0c9650ed4b42ac841',
      token: 'zuerich2017_1',
      tableNumber: "1",
      discipline: "000",
      numberOfSets: 3
    };

    vm.send = send;
    vm.updatePlayerData = updatePlayerData;

    vm.playersRawData = "";
    vm.players = [];

    function send() {

      vm.model.player1Id = vm.player1.id;
      vm.model.player2Id = vm.player2.id;
      vm.model.player3Id = vm.player3.id;
      vm.model.player4Id = vm.player4.id;

      vm.model.player1Name = vm.player1.name;
      vm.model.player2Name = vm.player2.name;
      vm.model.player3Name = vm.player3.name;
      vm.model.player4Name = vm.player4.name;

      console.log(vm.model);

      kozoomService.save(vm.model).$promise.then(() => toastr.success('Match an Kozoom gemeldet'));
    }

    function updatePlayerData() {
      vm.players = [];
      var lines = vm.playersRawData.split('\n');
      for (var i = 2; i < lines.length; i++) {
        var lineData = lines[i].split('\t');

        var id = "ss_" + cleanInput(lineData[2]);
        if (lineData[3]) {
          id = "itsf_" + cleanInput(lineData[3]);
        }

        var name = cleanInput(lineData[0]) + ',' + cleanInput(lineData[1]);

        vm.players.push({
          id: id,
          name: name
        });
      }

      console.log(vm.players);
    }

    function cleanInput(input) {
      input = input.replace(/"/g, '');
      input = input.replace('=', '');
      return input;
    }
  }
})();