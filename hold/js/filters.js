'use strict';

/* Filters */

angular.module('eventsApp.filters', [])

// INTERPOLATE FILTER
.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
}])

// CHECKMARK FILTER
.filter('checkmark', function() {
  return function(input) {
    return input ? 'Yes' : 'No';
  };
})

// NEW FILTER
.filter('newfilter', function() {
  return function(input) {
    	return input ? 'No' : 'No';
  };
})

// COMMITTED FILTER
.filter('CommittedFilter', function() {
  return function(input) {
  	if(input == 0)
  	{
    		return '\u2718';
  	}else{
  		return '\u2713';
  	}
  };
})

// CONTRACT FILTER
.filter('ContractFilter', function() {
  return function(input) {
  	if(input == 0)
  	{
    		return '\u2718';
  	}else{
  		return '\u2713';
  	}
  };
})

// PAYMENT FILTER
.filter('PaymentFilter', function() {
  return function(input) {
  	if(input == 0)
  	{
    		return '\u2718';
  	}else if(input == 1) {
  		return 'Pend';
  	}else if(input == 2) {
  		return '\u2713';
  	}else{
  		return '\u2718';
  	}
  };
})

// MAP-STATUS FILTER
.filter('mapStatus', function( StatusesConstant ) {
  return function(input) {
    if (StatusesConstant[input]) {
      return StatusesConstant[input];
    } else {
      return 'unknown';
    }
  };
})

// MAP-PARTNER-LEVEL FILTER
.filter('mapPlevel', function( PlevelesConstant ) {
  return function(input) {
    if (PlevelesConstant[input]) {
      return PlevelesConstant[input];
    } else {
      return 'unknown';
    }
  };
})

// MAP-GENERAL-SESSION-SPEAKER-TIME FILTER
.filter('mapSessionTime', function( SessionTimeConstant ) {
  return function(input) {
    if (SessionTimeConstant[input]) {
      return SessionTimeConstant[input];
    } else {
      return 'unknown';
    }
  };
})

.filter('reverse', function() {
      function toArray(list) {
         var k, out = [];
         if( list ) {
            if( angular.isArray(list) ) {
               out = list;
            }
            else if( typeof(list) === 'object' ) {
               for (k in list) {
                  if (list.hasOwnProperty(k)) { out.push(list[k]); }
               }
            }
         }
         return out;
      }
      return function(items) {
         return toArray(items).slice().reverse();
      };
   });

