"use strict";

angular.module('myApp.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'partials/home.html',
         controller: 'HomeCtrl'
      });
      $routeProvider.when('/dashboard', {
        templateUrl: 'templates/dashboard/index.html',
        controller: 'DashboardController'
      });


      $routeProvider.when('/exhibitors', {
        templateUrl: 'templates/exhibitors/index.html',
        controller: 'TestController'
        //controller: 'ExhibitorsController'
      });
      $routeProvider.when('/exhibitors/trash', {
        templateUrl: 'templates/exhibitors/trash.html',
        controller: 'TrashController'
        //controller: 'ExhibitorsController'
      });
      $routeProvider.when('/calendar', {
        templateUrl: 'templates/calendar/index.html',
        controller: 'CalendarCtrl'
        //controller: 'ExhibitorsController'
      });

      $routeProvider.when("/exhibitors/:exhibitorId", {
        templateUrl: 'templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
      });
      $routeProvider.when("/exhibitors/:exhibitorId/active", {
        templateUrl: 'templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
      });
      $routeProvider.when("/exhibitors/:exhibitorId/completed", {
        templateUrl: 'templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
      });

      $routeProvider.when('/chat', {
         templateUrl: 'partials/chat.html',
         controller: 'ChatCtrl'
      });

      $routeProvider.when('/account', {
         authRequired: true, // must authenticate before viewing this page
         templateUrl: 'partials/account.html',
         controller: 'AccountCtrl'
      });

      $routeProvider.when('/login', {
         templateUrl: 'partials/login.html',
         controller: 'LoginCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);