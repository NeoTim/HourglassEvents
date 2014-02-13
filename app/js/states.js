"use strict";

angular.module('myApp.states', ['ngAnimate', 'ui.router',])

     // configure views; the authRequired parameter is used for specifying pages
     // which should only be available while logged in
 

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,  $urlRouterProvider) {

    
    $urlRouterProvider.when("/", "/dashboard");
    $urlRouterProvider.otherwise("/dashboard");
    
    

     $stateProvider
        .state('companies', {
            abstract: true,
            url: "/companies",
            templateUrl: "templates/company/companies.html"
        })
        .state('companies.list', {
            url: "/list",
            templateUrl: "templates/company/companies.list.html",
             controller: "compsController"
        })
        .state('companies.detail', {
            url: '/:id',
            templateUrl: "templates/company/companies.detail.html",
            controller: 'companyDetail'
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

    $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: "/templates/dashboard.html"
    })

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
    //$locationProvider.html5Mode(true);

}]);