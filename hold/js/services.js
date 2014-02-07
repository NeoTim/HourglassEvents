'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('eventsApp.services', ['ngResource', 'firebase']).
  value('version', '0.1')

// EXHIBITORS ALL SERVICE
.factory("ExhibService", ['angularFire', function($firebase){
        var ref = new Firebase("http://hourglass-events.firebaseio.com//exhibitors");
        return $firebase(ref);
}])
.factory("ExhibitorsFireService", ['$firebase', function($firebase){
        var ref = new Firebase("http://hourglass-events.firebaseio.com/exhibitors");
        return $firebase(ref);
}])

.factory("ExhibitorsService", function($http){
  return {
    get: function() {
        return $http.get('exhibitors');
    }
  };
})

// EXHIBITOR SINGLE SERVICE
.factory('ExhibitorService', ['$resource',
  function($resource){
    return $resource('exhibitors/:exhibitorId', {}, {
      query: {method:'GET', params:{exhibitorId:'exhibitors'}, isArray:true}
    });
  }])

// EXHIBITOR CONTACTS SERVICE
.factory('ContactsService', ['$resource',
  function($resource){
    return $resource('/exhibitors/:exhibitorId/contacts', {}, {
      get: {method:'GET', params:{exhibitorId: 'exhibitors'}, isArray:true}
    });
  }])

// FLASH SERVICE
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

// SESSION SERVICE
.factory("SessionService", function() {
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

// AUTHENTICATION SERVICE
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
})

// STATUS-CONSTANT SERVICE
.factory( 'StatusesConstant', function() {
  return {
    0: 'No',
    1: 'Yes'
  };
})

// PARTNER-LEVEL-CONSTANT SERVICE
.factory( 'PlevelesConstant', function() {
  return {
    'Exhibitor': 'Exhibitor',
    'Bronze': 'Bronze',
    'Silver': 'Silver',
    'Gold': 'Gold',
    'Platinum': 'Platinum'
  };
})

// GENERAL-SESSION-SPEAKER-TIME-CONSTANT SERVICE
.factory( 'SessionTimeConstant', function() {
  return {
    0     : '0 hr',
    .5   : '.5 hr',
    1   : '1 hr',
    2 : '2 hrs'
  };
})

.factory('firebaseRef', ['Firebase', 'FBURL', function(Firebase, FBURL) {
  /**
   * @function
   * @name firebaseRef
   * @param {String|Array...} path
   * @return a Firebase instance
   */
  return function(path) {
     return new Firebase(pathRef([FBURL].concat(Array.prototype.slice.call(arguments))));
  }
}])

   // a simple utility to create $firebase objects from angularFire
.service('syncData', ['$firebase', 'firebaseRef', function($firebase, firebaseRef) {
  /**
   * @function
   * @name syncData
   * @param {String|Array...} path
   * @param {int} [limit]
   * @return a Firebase instance
   */
  return function(path, limit) {
     var ref = firebaseRef(path);
     limit && (ref = ref.limit(limit));
     return $firebase(ref);
  }
}]);

function pathRef(args) {
   for(var i=0; i < args.length; i++) {
      if( typeof(args[i]) === 'object' ) {
         args[i] = pathRef(args[i]);
      }
   }
   return args.join('/');
}
