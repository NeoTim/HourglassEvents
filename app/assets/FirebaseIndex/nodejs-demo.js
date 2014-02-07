
const Firebase = require('Firebase');
const FirebaseIndex = require('./FirebaseIndex.js').FirebaseIndex;

var FB      = new Firebase('https://katowulf-firebaseindex.firebaseio-demo.com/');
var IDX     = new FirebaseIndex(FB.child('index'), FB.child('widgets'));

IDX.on('child_added', function(ss, prevId) {
   console.log('child_added', ss.name(), prevId);
});

IDX.on('child_removed', function(ss) {
   console.log('child_removed', ss.name());
});

IDX.on('child_moved', function(ss, after) {
   console.log('child_moved', ss.name(), after);
});