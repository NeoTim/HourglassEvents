"use strict";

angular.module('myApp.routes', ['ngRoute', 'firebase'])





.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/dashboard', {
		templateURL: 'templates/dashboard/index.html',
		controller: 'dashboardCtrl'
	});

	$routeProvider.when('/grid', {
		template: '<iframe style="width:100%; min-height:100%; margin-bottom:0;" src="https://docs.google.com/a/hisimagination.com/spreadsheet/ccc?key=0AkMcfRC8dZgidE1oMWExZlBrSVo0emlkakEwX1JTdkE&usp=sharing"></iframe>'
	});

	$routeProvider.when('/companies', {
		templateURL: 'templates/companies/index.html',
		controller: 'compsController'
	});

	$routeProvider.when('/companies/:companyId', {
		templateURL: 'templates/companies/index.html',
		controller: 'compCtrl'
	});

	$locationProvider.html5Mode(true);
	$routeProvider.otherwise({ redirectTo: '/dashboard' })
}]);
