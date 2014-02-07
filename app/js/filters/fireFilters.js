'use strict';

/* Filters */

angular.module('myApp.fireFitlers', [])

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

.filter('objFilter', function() {
  return function(items, filter) {
      if (!filter){
          return items;
      }  
      var result = {};
        angular.forEach( filter, function(filterVal, filterKey) {
          angular.forEach(items, function(item, key) {
              var fieldVal = item[filterKey];
              if (fieldVal && fieldVal.toLowerCase().indexOf(filterVal.toLowerCase()) > -1){
                  result[key] = item;
              }
          });
        });
        return result;
    };
});

.filter('fromNow', function() {
  return function(timestamp) {
    return moment(timestamp).fromNow(); 
  };
});