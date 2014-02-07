
angular.module('myApp.service.firebase', ['firebase'])

// a simple utility to create references to Firebase paths
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
 }])


.service("fireCompanies", function($firebase) {
      //var _ref = new Firebase(FBURL + "/companies");
      var _ref = new Firebase('https://hourglass-events.firebaseio.com/');
      return {
            copyToScope: function(scope, variable) {
                  $firebase(_ref, scope, variable);
            },
            copyChildToScope: function(childName, scope, variable) {
                  $firebase(_ref.child(childName), scope, variable);
            } 
      };

})




function pathRef(args) {
   for(var i=0; i < args.length; i++) {
      if( typeof(args[i]) === 'object' ) {
         args[i] = pathRef(args[i]);
      }
   }
   return args.join('/');
};


