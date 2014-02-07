"use strict";

angular.module('myApp.states', ['ngAnimate', 'ui.router',])

     // configure views; the authRequired parameter is used for specifying pages
     // which should only be available while logged in
 

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,  $urlRouterProvider) {

    
    $urlRouterProvider.when("/companies", "/companies/list");
    $urlRouterProvider.otherwise("/dashboard");
    
    

     $stateProvider
        .state('companies', {
            abstract: true,
            authRequired: true,
            url: "/companies",
            templateUrl: "templates/companies/companies.html",
            controller: "CompaniesControl"
        })
        .state('companies.list', {
            url: "/list",
            authRequired: true,
            templateUrl: "templates/companies/companyList.html",
        })
        .state('companies.detail', {
            url: '/:id',
            authRequired: true,
            templateUrl: "templates/companies/single.html",
            controller: 'CompanyDetailCtrl'
        });
    $stateProvider
        .state('layout', {
            url: '/layout',
            templateUrl: 'templates/layout.html',
            controller: function($scope){

            }
        });
    $stateProvider
        .state('grid', {
            url: '/grid',
            template: '<iframe style="width:100%; min-height:100%; margin-bottom:0;" src="https://docs.google.com/a/hisimagination.com/spreadsheet/ccc?key=0AkMcfRC8dZgidE1oMWExZlBrSVo0emlkakEwX1JTdkE&usp=sharing"></iframe>'
        });



    $stateProvider
    .state('list', {
        url: "/list",
        templateUrl: "listView.html",
        controller: "listCtrl"
    })
    .state('items', {
        url: "/items",
        templateUrl: "itemsView.html",
        controller: "itemsCtrl"
    })    
    .state('list.item', {
        url: "/:id",
        templateUrl: "editView.html",
        controller: "editCtrl"
    });   
    //$locationProvider.html5Mode(true);

   

    $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: "/templates/dashboard/index.html",
            controller: 'dashboardCtrl'
    })
    $stateProvider.state('home', {
        url:"/home",
        templateUrl: "partials/home.html",
        controller: "HomeCrtl"
    })

/*    $stateProvider.state('exhibitors', {
        url: "/exhibitors",
        templateUrl: 'templates/exhibitors/exhibitors.html',
        controller: 'exhibitorsControl'
        //controller: 'ExhibitorsController'
    });
    $stateProvider.state('exhibitors/trash', {
        url: "/exhibitors/trash",
        templateUrl: 'templates/exhibitors/trash.html',
        controller: 'TrashController'
        //controller: 'ExhibitorsController'
    });
    $stateProvider.state('calendar', {
        templateUrl: 'templates/calendar/index.html',
        controller: 'CalendarCtrl'
        //controller: 'ExhibitorsController'
    });
    $stateProvider.state("exhibitors.list", {
        templateUrl: 'templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
    });
    $stateProvider.state("/exhibitors/:exhibitorId", {
        templateUrl: 'templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
    });*/

    $stateProvider.state('chat', {
        url: "/chat",
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
    });

    $stateProvider.state('account', {
        url: "/account",
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
    });

    $stateProvider.state('login', {
            url: "/login",
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
         
    });
                 //controller: 'LoginController'

}]);