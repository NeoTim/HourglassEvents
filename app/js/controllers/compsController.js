
angular.module('myApp.comps', ['firebase', 'ngGrid'])


.controller('compsController', function($timeout, $firebase, $scope, orderByPriorityFilter) {

var fb = new Firebase("http://hourglass-events.firebaseio.com/companies");
      
      $scope.data = $firebase(fb);

      $scope.myData = [];

      $scope.$watchCollection('data', function() {
            $scope.myData = orderByPriorityFilter($scope.data);
     });
   

      $scope.updateEntity = function(col,row){

            $scope.data.$save(row.entity.$id);

            console.log(row.entity.id);
      };
      
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
