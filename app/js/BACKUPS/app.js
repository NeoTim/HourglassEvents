'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp',
      [ 'ngSanitize','ui.sortable', 'angular-flip', 'mgcrea.ngStrap','ui.calendar', 'myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers',
         'waitForAuth', 'routeSecurity']
   )

app.config(function($httpProvider) {

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

})


.config(function($routeProvider) {

  $routeProvider.when('/login', {
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/orders', {
    templateUrl: 'templates/orders/index.html',
    controller: 'OrdersController',
    resolve: {
      orders: function(OrderService) {
        return OrderService.get();
      }
    }
  });
  $routeProvider.when('/production', {
    templateUrl: 'templates/production/index.html',
    controller: 'ProductionController',
    resolve: {
      pmethods : function(ProductionService) {
        return ProductionService.get();
      },
      entries: function(EntriesService) {
        return EntriesService.get();
      }
    }
  });

  $routeProvider.otherwise({ redirectTo: '/login' });

})






.directive('ngEnter', function() {
      return function(scope, element, attrs) {
          element.bind("keydown keypress", function(event) {
              if(event.which === 13) {
                  scope.$apply(function(){
                      scope.$eval(attrs.ngEnter, {'event': event});
                  });

                  event.preventDefault(); 
              }
          });
      };
})

.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/home'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });
})


.factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
})

app.factory("SessionService", function() {
  return {
    get: function(key) {
      return sessionStorage.getItem(key);
    },
    set: function(key, val) {
      return sessionStorage.setItem(key, val);
    },
    unset: function(key) {
      return sessionStorage.removeItem(key);
    }
  }
})

.factory("AuthenticationService", function($http, $sanitize, SessionService, FlashService, CSRF_TOKEN) {

  var cacheSession   = function() {
    SessionService.set('authenticated', true);
  };

  var uncacheSession = function() {
    SessionService.unset('authenticated');
  };

  var loginError = function(response) {
    FlashService.show(response.flash);
  };

  var sanitizeCredentials = function(credentials) {
    return {
      email: $sanitize(credentials.email),
      password: $sanitize(credentials.password),
      csrf_token: CSRF_TOKEN
    };
  };

  return {
    login: function(credentials) {
      var login = $http.post("/auth/login", sanitizeCredentials(credentials));
      login.success(cacheSession);
      login.success(FlashService.clear);
      login.error(loginError);
      return login;
    },
    logout: function() {
      var logout = $http.get("/auth/logout");
      logout.success(uncacheSession);
      return logout;
    },
    isLoggedIn: function() {
      return SessionService.get('authenticated');
    }
  };
});

app.controller("LoginController", function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      $location.path('/home');
    });
  };
});




   .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
      if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
         // double-check that the app has been configured
         angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
         setTimeout(function() {
            angular.element(document.body).removeClass('hide');
         }, 250);
      }
      else {
         // establish authentication
         $rootScope.auth = loginService.init('/login');
         $rootScope.FBURL = FBURL;
         
      }
   }]);

   








// BACKUP BEFORE LARAVEL


// // Declare app level module which depends on filters, and services
// angular.module('myApp',
//       ['ui.sortable', 'angular-flip', 'mgcrea.ngStrap','ui.calendar', 'myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers',
//          'waitForAuth', 'routeSecurity']
//    )

// .directive('ngEnter', function() {
//         return function(scope, element, attrs) {
//             element.bind("keydown keypress", function(event) {
//                 if(event.which === 13) {
//                     scope.$apply(function(){
//                         scope.$eval(attrs.ngEnter, {'event': event});
//                     });

//                     event.preventDefault(); 
//                 }
//             });
//         };
//     })



//    .run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
//       if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
//          // double-check that the app has been configured
//          angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
//          setTimeout(function() {
//             angular.element(document.body).removeClass('hide');
//          }, 250);
//       }
//       else {
//          // establish authentication
//          $rootScope.auth = loginService.init('/login');
//          $rootScope.FBURL = FBURL;

//       }
//    }]);

//    