
angular.module('eventsApp.config', [])

   // version of this seed app is compatible with angularFire 0.6
   // see tags for other versions: https://github.com/firebase/angularFire-seed/tags
   .constant('version', '0.6')

   // where to redirect users if they need to authenticate (see module.routeSecurity)
   //.constant('loginRedirectPath', '/login')

   // your Firebase URL goes here
   .constant('FBURL', 'https://hourglass-events.firebaseio.com');