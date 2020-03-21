(function () {
  'use strict';

  var controllerId = 'fordere.teamProfileCtrl';

  angular.module('fordere')
    .controller(controllerId, ['teamService', '$routeParams', 'matchService', teamProfileCtrl]);

  function teamProfileCtrl(teamService, $routeParams, matchService) {
    var ctrl = this;
    ctrl.getOpponentTeamName = getOpponentTeamName;
    ctrl.getOpponentTeamId = getOpponentTeamId;
    ctrl.isWin = isWin;
    ctrl.isDraw = isDraw;
    ctrl.isLoss = isLoss;
    ctrl.isHomeMatch = isHomeMatch;
    ctrl.isForfaitMatch = isForfaitMatch;
    ctrl.isMatchPlayed = isMatchPlayed;
    ctrl.isBookedMatch = isBookedMatch;

    ctrl.team = teamService.queryById({ Id: $routeParams.id });
    ctrl.matches = matchService.byTeamId({ Id: $routeParams.id });

    function isMatchPlayed(match) {
      return match.HomeTeamScore != undefined && !match.IsNotPlayedMatch;
    }

    function isBookedMatch(match) {
      return match.HomeTeamScore == undefined && match.BarId != undefined;
    }

    function isForfaitMatch(match) {
      return match.HomeTeamIsForfaitOut || match.GuestTeamIsForfaitOut;
    }

    function getOpponentTeamName(match) {
      if (match.HomeTeamId == $routeParams.id) {
        return match.GuestTeamName;
      }
      return match.HomeTeamName;
    }

    function getOpponentTeamId(match) {
      if (match.HomeTeamId == $routeParams.id) {
        return match.GuestTeamId;
      }
      return match.HomeTeamId;
    }

    function isHomeMatch(match) {
      return match.HomeTeamId == $routeParams.id;
    }

    function isWin(match) {
      if (isHomeMatch(match)) {
        return match.HomeTeamScore > match.GuestTeamScore;
      }

      return match.GuestTeamScore > match.HomeTeamScore;
    }

    function isDraw(match) {
      return match.GuestTeamScore === match.HomeTeamScore;
    }

    function isLoss(match) {
      if (isHomeMatch(match)) {
        return match.GuestTeamScore > match.HomeTeamScore;
      }

      return match.HomeTeamScore > match.GuestTeamScore;
    }
  }
})();