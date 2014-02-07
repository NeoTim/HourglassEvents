




app.filter('objFilter', function() {
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

app.filter('fromNow', function() {
  return function(timestamp) {
    return moment(timestamp).fromNow(); 
  };
});

function registerFirebaseService (name, url) {
  app.factory(name, function myService(angularFire) {
      var _ref = new Firebase(url);
      return {
        copyToScope: function(scope, variable) {
           return angularFire(_ref, scope, variable);
        },
        copyChildToScope: function(childName, scope, variable) {
          console.log(childName)
           return angularFire(_ref.child(childName), scope, variable);
        }
      };
  });
}


registerFirebaseService('itemService','https://hourglass-events.firebaseio.com/companies/');

var editCtrl = function($scope, itemService, $stateParams) {
  $scope.id = '';
  var promise = itemService.copyChildToScope($stateParams.id, $scope, 'srcItem');
  promise.then(function () {
    $scope.item = angular.copy($scope.srcItem);
  });
  
  
  $scope.save = function () {
     $scope.srcItem = angular.copy($scope.item);
  }
  
  $scope.reset = function () {
     $scope.item = angular.copy($scope.srcItem);
  }  
}
var itemsCtrl = function($scope, itemService) {
  itemService.copyToScope($scope,'items');
}

var listCtrl = function($scope, itemService) {
  itemService.copyToScope($scope,'items');
  $scope.newItem = {};

  $scope.addNewItem = function() {
    var key = guid();
    $scope.newItem.created = new Date();
    $scope.items[key] = $scope.newItem;
    $scope.newItem = {};
  };
  $scope.deleteItem = function(id){
    delete $scope.items[id];
  };
  $scope.removeAll = function() {
    $scope.items = {};
  };
};
var editCtrl = function($scope, itemService, $stateParams) {
  $scope.id = '';
  var promise = itemService.copyChildToScope($stateParams.id, $scope, 'srcItem');
  promise.then(function () {
    $scope.item = angular.copy($scope.srcItem);
  });
  
  
  $scope.save = function () {
     $scope.srcItem = angular.copy($scope.item);
  }
  
  $scope.reset = function () {
     $scope.item = angular.copy($scope.srcItem);
  }  
}
var app = angular.module('plunker', ['ui.router','firebase']);

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
             .toString(16)
             .substring(1);
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + s4() + s4();
}
