"use strict";

angular.module('myApp.routes', ['ui.router'])

	 // configure views; the authRequired parameter is used for specifying pages
	 // which should only be available while logged in


.run(function ($rootScope, $state, $stateParams) {
    	$rootScope.$state = $state;
    	$rootScope.$stateParams = $stateParams;
})

.config(['$stateProvider', '$urlRoutProvider', function($stateProvider, $urlRoutProvider) {

	 

	 $stateProvider
	    	.state('companies', {
	        	url: "/companies",
			templateUrl: "templates/companies/companies.html",
	        	controller: "companiesController"
	})
	.state('edit-companies', {
	      url: "/edit-companies",
	      templateUrl: "templates/companies/editCompanyView.html",
	      controller: "editCompanyCtrl"
	})    
	.state('edit-companies.company', {
	      url: "/:id",
	      templateUrl: "editView.html",
	      controller: "editCtrl"
	});   

	$urlRoutProvider.when("", "/dashboard")
	$urlRoutProvider.when("/home", "/login")
	$urlRoutProvider.when("/", "/home")

	$urlRoutProvider.otherwise("/dashboard");

	$stateProvider.state('dashboard', {
			url: "/dashboard",
			templateUrl: "/templates/dashboard/dashboard.html",
			controller: 'DashboardController'
	})
	$stateProvider.state('home', {
		url:"/home",
		templateUrl: "partials/home.html",
		controller: "HomeCrtl"
	})

	$stateProvider.state('exhibitors', {
		url: "/exhibitors",
		templateUrl: 'templates/exhibitors/exhibitors.html',
		controller: 'exhibitorsControl'
		//controller: 'ExhibitorsController'
	});
	$stateProvider.state('exhibitors/trash', {
		url: "/exhibitors/trash"
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
	});

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
		url "/login",
		 templateUrl: 'partials/login.html',
		 controller: 'LoginCtrl'
		 
	});
				 //controller: 'LoginController'

}]);