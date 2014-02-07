'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp',
      ['ngAnimate', 'ui.router', 
         'ng-firebase', 'ui.sortable', 'angular-flip', 'firebase',
        'myApp.config', 'myApp.filters', 'myApp.services',
        'myApp.directives', 'myApp.siteController', 'myApp.todoController',
        'myApp.authController', 'myApp.companiesController',
        'waitForAuth', 'routeSecurity', 'myApp.states', 'sample'])




.run(['$state', '$stateParams', 'loginService', '$rootScope', 'FBURL', function($state, $stateParams, loginService, $rootScope, FBURL) {

       $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

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


function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}
function registerFirebaseService (name, url) {
myApp.factory(name, function myService(angularFire) {
      var _ref = new Firebase(url);
      return {
        copyToScope: function(scope, variable) {
           angularFire(_ref, scope, variable);
        },
        copyChildToScope: function(childName, scope, variable) {
           angularFire(_ref.child(childName), scope, variable);
        }
      };
  });
}

registerFirebaseService('itemService','https://hourglass-events.firebaseio.com/');
