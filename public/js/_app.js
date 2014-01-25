// setter
var app = angular.module("app", []).config(function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl: 'templates/login.html',
		controller: 'loginController'
	});

	$routeProvider.when('/home', {
		templateUrl: 'templates/home.html',
		controller: 'homeController'
	});

	$routeProvider.otherwise({ redirectTo: "/login" });
});

app.factory("AuthenticationService",  function($http, $location) {
	return {
		login: function(credentials){
			return $http.post("/auth/login", credentials);
		},
		logout: function() {
			return $http.get("/auth/logout");
		}
	};
});

// getter
app.controller('loginController', function($scope, AuthenticationService) {

	a.credentials = { username: "", password: "" };

	a.login = function() {
		b.login(a.credentials);
	};
});

app.controller('homeController', function($scope, $location){
	$scope.title = "Home";
	$scope.message = 'These are some images';

	$scope.logout = function() {
		AuthenticationService.logout();
	}

});

app.directive('showsMessageWhenHovered', function() {
	return {
		redirect: "A" ,//A = Attribute C = classname E = element M = HTML
		link: function(scope, element, attributes) {
			var originalMessage = scope.message;
			element.bind("mouseover", function() {
				scope.message = attributes.message;
				scope.$apply();
			});
			element.bind("mouseout", function() {
				scope.message = attributes.message;
				scope.$apply();
			});
		}
	};
});