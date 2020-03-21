(function () {
  'use strict';

  var controllerId = 'fordere.statisticsCtrl';

  angular.module('fordere')
    .controller(controllerId, ['$routeParams', 'statisticsService', statisticsCtrl]);

  function statisticsCtrl($routeParams, statisticsService) {
    var vm = this;

    statisticsService.query({ SeasonId: $routeParams.seasonId }, dataLoaded);

    function dataLoaded(result) {
      vm.matchesPlayed = {
        labels: result.MatchesPlayed.Labels,
        data: result.MatchesPlayed.Data
      };

      vm.matchesBar = {
        labels: result.MatchesPerLocation.Labels,
        data: result.MatchesPerLocation.Data
      };

      vm.matchesWeek = {
        labels: result.MatchesPerWeek.Labels,
        series: result.MatchesPerWeek.Series,
        data: result.MatchesPerWeek.Data
      };

      vm.matchesWeekday = {
        labels: result.MatchesPerWeekday.Labels,
        data: result.MatchesPerWeekday.Data,
        percentageData: new Array(1),
        legend: ['Anzahl von Spielen pro Wochentag'],
        legendPercentage: ['Prozentzahl an Spielen pro Wochentag'],
        percentage: false
      };
      var sum = 0;
      angular.forEach(vm.matchesWeekday.data[0], function (element) {
        sum += element;
      });
      vm.matchesWeekday.percentageData[0] = vm.matchesWeekday.data[0].map(function (element) {
        return Math.round((element * 10000) / sum) / 100;
      });
      vm.togglePercentage = function () {
        vm.matchesWeekday.percentage = !vm.matchesWeekday.percentage;
      }
    }
  }
})();
