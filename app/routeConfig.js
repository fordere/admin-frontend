(function () {
    angular.module('fordere').config(['$routeProvider', '$locationProvider', 'StripeCheckoutProvider', function ($routeProvider, $locationProvider, stripeCheckoutProvider) {

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'app/ui/index/index.html',
                label: 'Home'
            })
            .when('/index', {
                templateUrl: 'app/ui/index/index.html',
            })
            .when('/sts', {
                templateUrl: 'app/ui/turniere/sts.html',
                label: 'STS-Turnier'
            })
            .when('/kids', {
                templateUrl: 'app/ui/kids/kids.html',
                label: 'Kids'
            })
            .when('/sts/anmeldung', {
                templateUrl: 'app/ui/turniere/tournamentregistration_sts.html',
                label: 'Anmeldung'
            })
            .when('/reisli', {
                templateUrl: 'app/ui/turniere/sff.html',
                label: 'Reisli'
            })
            .when('/reisli/anmeldung', {
                templateUrl: 'app/ui/turniere/tournamentregistration_sff.html',
                label: 'Anmeldung'
            })
            .when('/sommerprogramm', {
                templateUrl: 'app/ui/turniere/sommerprogramm.html',
                label: 'Sommer-Programm'
            })
            .when('/casino-wm', {
                templateUrl: 'app/ui/turniere/casino.html',
                label: 'Casino Tischfussball-WM'
            })
            .when('/faq', {
                templateUrl: 'app/ui/faq/faq.html',
                label: 'FAQ'
            })
            .when('/divisionselection', {
                templateUrl: 'app/ui/division/divisionSelection.html',
                label: 'Division'
            })
            .when('/turniere', {
                templateUrl: 'app/ui/turniere/turniere.html',
                label: 'Turniere'
            })
            .when('/forum', {
                templateUrl: 'app/ui/forum/threadList.html',
                label: 'Forum'
            })
            .when('/forum/regeln', {
                templateUrl: 'app/ui/forum/rules.html',
                label: 'Regeln'
            })
            .when('/forum/thread/:ThreadId', {
                templateUrl: 'app/ui/forum/thread.html',
                label: 'Thema'
            })
            .when('/forum/new', {
                templateUrl: 'app/ui/forum/newThread.html',
                label: 'Neues Thema'
            })
            .when('/archiv', {
                templateUrl: 'app/ui/archive/archive.html',
                label: 'Archiv'
            })
            .when('/bars', {
                templateUrl: 'app/ui/bars/bars.html',
                label: 'Bars'
            })
            .when('/season', {
                templateUrl: 'app/ui/season/register.html',
                label: 'Saison',
            })
            .when('/barmasters', {
                templateUrl: 'app/ui/season/barmasters.html',
                label: 'Bar Masters',
            })
            .when('/season/einteilung/:competitionId', {
                templateUrl: 'app/ui/season/einteilung.html',
                label: 'Einteilung',
            })
            .when('/my-season', {
                templateUrl: 'app/ui/season/myseason.html',
                label: 'Meine Saison'
            })
            .when('/leagues/:Id/standings', {
                templateUrl: 'app/ui/liga/standings.html',
                label: 'Tabelle',
                controller: 'fordere.standingsCtrl',
                controllerAs: 'ctrl',
                activetab: 'standings'
            })
            .when('/finaltag', {
                templateUrl: 'app/ui/finalday/finalday.html',
                label: 'Finaltag',
                controller: 'fordere.finalDayCtrl',
                controllerAs: 'ctrl'
            })
            .when('/season/:seasonId/finaltag', {
                templateUrl: 'app/ui/finalday/finalday.html',
                label: 'Finaltag',
                controller: 'fordere.finalDayCtrl',
                controllerAs: 'ctrl'
            })
            .when('/finaltagmodus', {
                templateUrl: 'app/ui/finalday/finaldayRules.html',
                label: 'Finaltag Modus'
            })
            .when('/leagues/:Id/finalqualification', {
                templateUrl: 'app/ui/liga/finalqualification.html',
                label: 'Qualifikation Finaltag',
                controller: 'fordere.standingsCtrl',
                controllerAs: 'ctrl',
                activetab: 'finalqualification'
            })
            .when('/leagues/:Id/teams', {
                templateUrl: 'app/ui/liga/teams.html',
                label: 'Teams',
                controller: 'fordere.teamsCtrl',
                controllerAs: 'ctrl',
                activetab: 'teams'
            })
            //.when('/leagues/:Id/final', {
            //  templateUrl: 'app/ui/liga/final.html',
            //  label: 'Finaltag',
            //  controller: 'fordere.finalCtrl',
            //  controllerAs: 'ctrl',
            //  activetab: 'final'
            //})

            .when('/cups/:id/tree', {
                templateUrl: 'app/ui/liga/cup-tree.html',
                label: 'Cup Tree'
            })
            .when('/season/register', {
                templateUrl: 'app/ui/season/register.html',
                label: 'Anmeldung'
            })
            .when('/season/payment', {
                templateUrl: 'app/ui/season/payment.html',
                label: 'Mitgliederbeitrag',
                resolve: {
                    // checkout.js isn't fetched until this is resolved.
                    stripe: stripeCheckoutProvider.load
                }
            })
            .when('/season/termine', {
                templateUrl: 'app/ui/season/termine.html',
                label: 'Termine'
            })
            .when('/season/:seasonId/statistics', {
                templateUrl: 'app/ui/season/statistics.html',
                label: 'Statistiken'
            })
            .when('/rules/:id', {
                templateUrl: 'app/ui/season/rules/rules.html',
            })
            .when('/info/barmasters', {
                templateUrl: 'app/ui/season/rules/barmasters.html',
                label: 'Bar Masters'
            })
            .when('/season/register/:id', {
                templateUrl: 'app/ui/season/registerdetail.html',
                label: 'Liga'
            })
            .when('/verein/organe', {
                templateUrl: 'app/ui/verein/organe.html',
                label: 'Organe'
            })
            .when('/verein/vorstand', {
                templateUrl: 'app/ui/verein/vorstand.html',
                label: 'Vorstand'
            })
            .when('/verein/stf', {
                templateUrl: 'app/ui/verein/stf.html',
                label: 'STF - Swiss Tablesoccer Federation'
            })
            .when('/verein', {
                templateUrl: 'app/ui/verein/verein.html',
                label: 'Verein'
            })
            .when('/verein/statuten', {
                templateUrl: 'app/ui/verein/statuten.html',
                label: 'Statuten'
            })
            .when('/cup', {
                templateUrl: 'app/ui/liga/cup.html',
                label: 'Cup'
            })
            .when('/teams/:id', {
                templateUrl: 'app/ui/team/profile.html',
                label: 'Teamdetails'
            })
            .when('/news/:id', {
                templateUrl: 'app/ui/news/newsdetail.html',
                label: 'Detail'
            })
            .when('/news', {
                templateUrl: 'app/ui/news/newslist.html',
                label: 'News'
            })
            .when('/team/:id', {
                templateUrl: 'app/ui/team/profile.html',
                label: 'Team'
            })
            .when('/contact', {
                templateUrl: 'app/ui/contact/contact.html',
                label: 'Kontakt'
            })
            .when('/profile', {
                templateUrl: 'app/ui/profile/profile.html',
                label: 'Profil'
            })
            .when('/register', {
                templateUrl: 'app/ui/profile/registerUser.html',
                label: 'Registrieren'
            })
            .when('/passwordLost', {
                templateUrl: 'app/ui/profile/passwordLost.html',
                label: 'Passwort vergessen'
            })
            .when('/matches/:id', {
                templateUrl: 'app/ui/match/match.html',
                label: 'Match'
            })
            .when('/auth_required', {
                templateUrl: 'app/ui/common/auth_required.html',
                label: 'Kein Zugriff'
            })
            .when('/new-password/:token', {
                templateUrl: 'app/ui/recovery/new_password.html',
                label: 'Neues Passwort'
            })
            .when('/password_set', {
                templateUrl: 'app/ui/recovery/password_set.html',
                label: 'Neues Passwort gesetzt'
            })
            .when('/admin', {
                templateUrl: 'app/ui/admin/dashboard.html',
                label: 'Admin'
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
            .when('/admin/kozoom', {
                templateUrl: 'app/ui/admin/kozoom/kozoom.html',
                label: 'Kozoom'
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
