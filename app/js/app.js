'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
      'ngAnimate', 'ngGrid', 'ui.router',  'shoppinpal.mobile-menu',
      'ng-firebase', 'ui.sortable', 'firebase', 'myApp.states',
      'myApp.notes',
      'myApp.config', 'myApp.filters', 'myApp.services',
      'myApp.directives', 'myApp.siteController', 'myApp.todoController',
      'myApp.authController', 'myApp.companies',
      'waitForAuth',  'myApp.states', 'sample'])


// let's make a nav called `myOffCanvas`
/*.controller('MyCtrl', function(offCanvas) {
    this.toggle = offCanvas.toggle;
})
.controller('navCtrl', function($scope, offCanvas, syncData) {
    $scope.companies = syncData('companies');
    this.toggle = offCanvas.toggle;
})
.factory('offCanvas', function(cnOffCanvas) {
    return cnOffCanvas({
      controller: 'navCtrl',
      controllerAs: 'nav',
     container: document.getElementById('canvContent'),
      templateUrl: 'templates/offcanvas/my-offcanvas.html'
    })
})*/

.controller('CollapseDemoCtrl', function($scope) {
          $scope.isCollapsed = false;
})





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

     


  }])

.controller('compsController', function($timeout, $firebase, $scope, orderByPriorityFilter) {
    /*$scope.myData = [{name: "Moroni", age: 50},
                     {name: "Tiancum", age: 43},
                     {name: "Jacob", age: 27},
                     {name: "Nephi", age: 29},
                     {name: "Enos", age: 34}];
*/
var fb = new Firebase("http://hourglass-events.firebaseio.com/companies");
      
      $scope.data = $firebase(fb);
      //var myData = $firebase(fb);
      $scope.myData = [];

     /* fb.on('value' ,function(snap){
            $timeout(function(){
              $scope.myData = snap.val();
            });
      });
      fb.on('child_added', function(snap){
          $timeout(function(){
              $scope.myData = snap.val();
            });
      });*/
      $scope.$watchCollection('data', function() {
            $scope.myData = orderByPriorityFilter($scope.data);
     });
   

      $scope.updateEntity = function(col,row){
        //fb.child(row.entity.id).child(col.field).set(row.entity.$id);
            //var ref = new Firebase(fb + "/" + row.entity.id + "/" + col.field);
            //  myData.$child(row.entity.id).$child(col.field).$set(row.entity.$id);
            $scope.data.$save(row.entity.$id);
            //console.log(row.entity.$id + " = " + col.field);
            console.log(row.entity.id);
      };
      /*$scope.$on('ngGridEventEndCellEdit',function(value){
                    $scope.data.$set(value);
                  
                });*/
      
      $scope.gridOptions = { 
            data: 'myData',
            enableCellSelection: true,
            enableRowSelection: false,
            enableCellEditOnFocus: true,
            showGroupPanel: true,
            jqueryUIDraggable: true,
          
          
          

            columnDefs: [
                  {field: 'company', displayName: 'Company', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field:'committed', displayName:'Committed', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)"  ng-class="\'colt\' + col.index" type="checkbox" ng-input="COL_FIELD" ng-model="COL_FIELD" />' },
                  {field:'contract', displayName:'Contract', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)"  ng-class="\'colt\' + col.index" type="checkbox" ng-input="COL_FIELD" ng-model="COL_FIELD" />' },
                  {field: 'forcast_revenue', displayName: 'Forcast Revenue', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'payment_method', displayName: 'Payment Type', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'deposit_due', displayName: 'Deposit Due', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'amount_paid', displayName: 'Amount Paid', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'total_due', displayName: 'Total Dues', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'plevel_proposed', displayName: 'Patner Level Proposed', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'plevel', displayName: 'Patner Level', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'},
                  {field: 'booth', displayName: 'Booth #', enableCellEdit: true, editableCellTemplate: '<input ng-change="updateEntity(col, row)" ng-class="\'colt\' + col.index" type="text" ng-input="COL_FIELD" ng-model="COL_FIELD" />'}
                  
                  ]
            };
});



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

