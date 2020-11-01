(function () {
    angular.module('fordere').config(['$routeProvider', '$locationProvider', 'StripeCheckoutProvider', function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'app/ui/home/home.html',
                label: 'Admin Panel'
            })
            .when('/login', {
                templateUrl: 'app/ui/home/home.html',
                label: 'Login'
            })
            .when('/admin/seasons', {
                templateUrl: 'app/ui/admin/season/season/season.html',
                label: 'Saison'
            })
            .when('/admin/seasons/:id', {
                templateUrl: 'app/ui/admin/season/season/seasonDetail.html',
                label: 'Details'
            })
            .when('/admin/news', {
                templateUrl: 'app/ui/admin/news/news.html',
                label: 'News'
            })
            .when('/admin/news/:id', {
                templateUrl: 'app/ui/admin/news/newsDetail.html'
            })
            .when('/admin/bars', {
                templateUrl: 'app/ui/admin/bars/bars.html',
                label: 'Bars'
            })
            .when('/admin/bars/:id', {
                templateUrl: 'app/ui/admin/bars/barDetail.html'
            })
            .when('/admin/bars/:barId/tables', {
                templateUrl: 'app/ui/admin/bars/table/table.html',
                label: 'Tische'
            })
            .when('/admin/bars/:barId/tables/:id', {
                templateUrl: 'app/ui/admin/bars/table/tableDetail.html',
                label: 'Tisch Detail'
            })
            .when('/admin/bars/:barId/tables/:id/availabilities', {
                templateUrl: 'app/ui/admin/bars/table/tableAvailability.html',
                label: 'Verfügbarkeit'
            })

            .when('/admin/season/:SeasonId/competitions/:competitionId/teaminscriptions', {
                templateUrl: 'app/ui/admin/season/teaminscription/teamInscriptions.html',
                label: 'Team Anmeldungen'
            })
            .when('/admin/season/:SeasonId/competitions/:competitionId/teaminscriptions/:id', {
                templateUrl: 'app/ui/admin/season/teaminscription/teamInscriptionDetail.html',
                label: 'Detail'
            })
            .when('/admin/users', {
                templateUrl: 'app/ui/admin/user/users.html',
                label: "Benutzer"
            })
            .when('/admin/users/:id', {
                templateUrl: 'app/ui/admin/user/userDetail.html',
                label: "Details"
            })
            .when('/admin/season/:SeasonId/payment', {
                templateUrl: 'app/ui/admin/season/payment/payment.html',
                label: "Zahlung"
            })
            .when('/admin/season/:SeasonId/finalday/qualification', {
                templateUrl: 'app/ui/admin/season/finalday/qualification.html',
                label: "Finaltag Qualifikation"
            })
            .when('/admin/finalday/:Id/dashboard', {
                templateUrl: 'app/ui/admin/season/finalday/dashboard.html',
                label: "Finaltag Dashboard"
            })
            .when('/admin/finalday/:Id/finishedMatches', {
                templateUrl: 'app/ui/admin/season/finalday/finishedMatches.html',
                label: "Beendete Finaltag-Spiele"
            })
            .when('/admin/finalday/:Id/detail', {
                templateUrl: 'app/ui/admin/season/finalday/finaldayEdit.html',
                label: "Finaltag Details"
            })
            .when('/admin/finalday/:FinalDayId/competition/:TournamentId', {
                templateUrl: 'app/ui/admin/season/finalday/competitionDetail.html',
                label: "Turnier Details"
            })
            .when('/admin/cups', {
                templateUrl: 'app/ui/admin/season/cup/cups.html',
                label: 'Cup Verwaltung'
            })
            .when('/admin/cups/:id', {
                templateUrl: 'app/ui/admin/season/cup/cupDetail.html',
                label: 'Cup Detail'
            })
            .when('/admin/cups/:id/round-:round', {
                templateUrl: 'app/ui/admin/season/cup/cupDetail.html',
                label: 'Cup Detail'
            })
            .when('/admin/season/:seasonId/competitions', {
                templateUrl: 'app/ui/admin/season/competition/competitions.html',
                label: 'Liga'
            })
            .when('/admin/season/:seasonId/competitions/:id/spielbetrieb', {
                templateUrl: 'app/ui/admin/season/competition/leagueSpielbetrieb.html',
                label: 'Spielbetrieb'
            })
            .when('/admin/season/:seasonId/competitions/:id/spielbetrieb/:matchid', {
                templateUrl: 'app/ui/admin/season/competition/match.html',
                label: 'Match'
            })
            .when('/admin/season/:seasonId/competitions/:id/edit', {
                templateUrl: 'app/ui/admin/season/competition/competitionDetail.html',
                label: 'Bearbeiten'
            })
            .when('/admin/season/:seasonId/competitions/:competitionId/leagues', {
                templateUrl: 'app/ui/admin/season/competition/leagues.html',
                label: 'Stärkeklassen'
            })
            .when('/admin/season/:seasonId/competitions/:competitionId/leagues/:id', {
                templateUrl: 'app/ui/admin/season/competition/leagueDetail.html',
                label: 'Bearbeiten'
            })
            .when('/admin/mailinglist', {
                templateUrl: 'app/ui/admin/mailinglist/mailingList.html',
                label: 'Mailing list'
            })
            .when('/admin/sms', {
                templateUrl: 'app/ui/admin/sms/smsSender.html',
                label: 'SMS Sender'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();
