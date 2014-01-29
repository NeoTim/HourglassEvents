'use strict';


// Declare app level module which depends on filters, and services
var eventsApp = angular.module('eventsApp', [
  'eventsApp.config',
  'firebase',
  'ngRoute',
  'eventsApp.animations',
  'ngSanitize',
  'eventsApp.filters',
  'eventsApp.services',
  'eventsApp.directives',
  'eventsApp.controllers'
])

// $ROUTE PROVIDER
.config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/login', {
        templateUrl: 'app/partials/login.html',
        controller: 'LoginController'
      });

      $routeProvider.when('/', {
        templateUrl: 'app/templates/dashboard/index.html',
        controller: 'DashboardController'
      });

      $routeProvider.when('/dashboard', {
        templateUrl: 'app/templates/dashboard/index.html',
        controller: 'DashboardController'
      });


      $routeProvider.when('/exhibitors', {
        templateUrl: 'app/templates/exhibitors/index.html',
        controller: 'TestController'
        //controller: 'ExhibitorsController'
      });

      $routeProvider.when("/exhibitors/:exhibitorId", {
        templateUrl: 'app/templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
      });
      $routeProvider.when("/exhibitors/:exhibitorId/active", {
        templateUrl: 'app/templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
      });
      $routeProvider.when("/exhibitors/:exhibitorId/completed", {
        templateUrl: 'app/templates/exhibitors/single.html',
        controller: 'ExhibitorDetailCtrl'
      });
      $routeProvider.otherwise({ redirectTo: '/login' });
}])





// CONFIG $HTTP PROVIDER
.config(['$httpProvider', function($httpProvider) {

      var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
            var success = function(response) {
                  return response;
            };

            var error = function(response) {
                  if(response.status === 401) {
                        SessionService.unset('authenticated');
                        $location.path('/login');
                        FlashService.show(response.data.flash);
                  }
                  return $q.reject(response);
            };

            return function(promise) {
                  return promise.then(success, error);
            };
      };

      $httpProvider.responseInterceptors.push(logsOutUserOn401);
}])

// TODO FILTER
.filter('todoFilter', function ($location) {
  return function (input) {
    var filtered = {};
    angular.forEach(input, function (todo, id) {
      var path = $location.path();
      if (path === '/active') {
        if (!todo.completed) {
          filtered[id] = todo;
        }
      } else if (path === path + '/completed') {
        if (todo.completed) {
          filtered[id] = todo;
        }
      } else {
        filtered[id] = todo;
      }
    });
    return filtered;
  };
})
// NOTE FILTER
.filter('noteFilter', function ($location) {
  return function (input) {
    var filtered = {};
    angular.forEach(input, function (note, id) {
      var path = $location.path();
      if (path === '/active') {
        if (!note.completed) {
          filtered[id] = note;
        }
      } else if (path === path + '/completed') {
        if (note.completed) {
          filtered[id] = note;
        }
      } else {
        filtered[id] = note;
      }
    });
    return filtered;
  };
})

// RUN LOGIN 
.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/home'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });
});


