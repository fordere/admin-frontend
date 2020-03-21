(function () {

    angular.module('fordere').directive('cupBracket', [function () {
        return {
            restrict: 'A',
            scope: {
                matches: '=?'
            },
            controller: ['$scope', '$element', function ($scope, $element) {
                $scope.$watch('matches', function (data) {
                    loadData(data);
                });

                // TODO SSH: Review and cleanup this code
                function loadData(data) {
                    if (!data) {
                        return;
                    }

                    var matches = data;

                    var bracketData = {
                        teams: [],
                        results: []
                    }

                    if (data.length === 0) {
                        $($element).hide();
                    }

                    // to track which team is above another team in the tree (visually), add the ids from top to bottom into an array.
                    // this array is used to map the score to the right team within a match below.
                    bracketData.teamOrder = [];

                    for (var i = 0; i < matches.length; ++i) {
                        if (matches[i].CupRound > 1) {
                            // only add the teams from the first round
                            break;
                        }

                        bracketData.teams.push([{ name: matches[i].HomeTeamName, id: matches[i].HomeTeamId, flag: 'de' }, { name: matches[i].GuestTeamName, id: matches[i].GuestTeamId, flag: 'de' }]);
                        bracketData.teamOrder.push(matches[i].HomeTeamId);
                        bracketData.teamOrder.push(matches[i].GuestTeamId);
                    }

                    data.forEach(function (match, key) {
                        if (!bracketData.results[match.CupRound - 1]) {
                            bracketData.results.push([]);
                        }

                        if (bracketData.teamOrder.indexOf(match.HomeTeamId) < bracketData.teamOrder.indexOf(match.GuestTeamId)) {
                            bracketData.results[match.CupRound - 1].push([match.HomeTeamScore, match.GuestTeamScore]);
                        } else {
                            bracketData.results[match.CupRound - 1].push([match.GuestTeamScore, match.HomeTeamScore]);
                        }
                    });

                    function render(container, data2, score) {
                        if (!data2 || !data2.flag || !data2.name)
                            return;
                        container.append('<a href="/teams/' + data2.id + '">' + data2.name + '</a>');
                    }

                    $($element).bracket({ init: bracketData, decorator: { render: render, edit: function () { } } });
                }
            }],
            link: function (scope, element, attrs) {
                var cupId = scope.$eval(attrs.cupBracket);
                if (cupId) {
                    cupService.getMatches({ Id: cupId }, function (data) {
                        scope.matches = data;
                    });
                }
            }
        };
    }
    ]);

})();