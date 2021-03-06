'use strict';

/* Filters */

angular.module('myApp.filters', [])
   .filter('interpolate', ['version', function(version) {
      return function(text) {
         return String(text).replace(/\%VERSION\%/mg, version);
      }
   }])


.filter('objFilter', function() {
  return function(companies, filter) {
      if (!filter){
          return companies;
      }  
      var result = {};
        angular.forEach( filter, function(filterVal, filterKey) {
          angular.forEach(companies, function(company, key) {
              var fieldVal = company[filterKey];
              if (fieldVal && fieldVal.toLowerCase().indexOf(filterVal.toLowerCase()) > -1){
                  result[key] = company;
              }
          });
        });
        return result;
    };
})

.filter('fromNow', function() {
  return function(timestamp) {
    return moment(timestamp).fromNow(); 
  };
})


// CHECKMARK FILTER
.filter('checkmark', function() {
  return function(input) {
    return input ? 'Yes' : 'No';
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
   })
   
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
});
