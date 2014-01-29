'use strict';


// Declare app level module which depends on filters, and services
var EventsApp = angular.module('EventsApp', [
  'ngRoute',
  'ngSanitize',
  'EventsApp.filters',
  'EventsApp.services',
  'EventsApp.directives',
  'EventsApp.controllers'
]);
EventsApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/templates/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/home', {
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });

  $routeProvider.when('/orders', {
    templateUrl: 'templates/orders/index.html',
    controller: 'OrdersController',
    resolve: {
      orders: function(OrderService) {
        return OrderService.get();
      }
    }
  });
  $routeProvider.when('/production', {
    templateUrl: 'templates/production/index.html',
    controller: 'ProductionController',
    resolve: {
      pmethods : function(ProductionService) {
        return ProductionService.get();
      },
      entries: function(EntriesService) {
        return EntriesService.get();
      }
    }
  });
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({ redirectTo: '/login' });

}]);
EventsApp.config(['$httpProvider', function($httpProvider) {

      var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
            var success = function(response) {
                  return response;
            };

            var error = function(response) {
                  if(response.status === 401) {
                        SessionService.unset('authenticated');
                        $location.path('/login');
                        FlashService.show(response.data.flash);
                  }
                  return $q.reject(response);
            };

            return function(promise) {
                  return promise.then(success, error);
            };
      };

      $httpProvider.responseInterceptors.push(logsOutUserOn401);
}]);
EventsApp.run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/home'];

  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });
});

// EXHIBITORS CONTROLLER
.controller("ExhibitorsController", ['$scope', 'exhibitors', '$timeout', 'StatusesConstant', 'SessionTimeConstant', 'PlevelesConstant', '$http', 
  function($scope, exhibitors, $timeout, StatusesConstant, SessionTimeConstant, PlevelesConstant, $http) {
  
      $scope.title = 'Exhibitors';
      $scope.filterOptions = {
            filterText: "",
            useExternalFilter: false
      };  

      


      
      $scope.statuses = StatusesConstant;
      $scope.pleveles = PlevelesConstant;
      $scope.sestimes = SessionTimeConstant;
      $scope.centeredCellTemplate = '<div style="text-align:center; height:36px;" class=\"ngCellText\" ng-class=\"col.colIndex()\"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>';
      $scope.regCellTemplate = '<div style=\"height:36px;\" class=\"companyCell ngCellText\" ng-class=\"col.colIndex()\"><span ng-cell-text>{{row.getProperty(col.field)}}</span></div>';
      $scope.timeCellTemplate = '<div style=\"height:36px; text-align:center;\" class=\"companyCell ngCellText\" ng-class=\"col.colIndex()\"><span ng-cell-text>{{row.getProperty(col.field)}} hrs</span></div>';
      $scope.cellInputEditableTemplate = '<input type=\"text\" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
      $scope.cellSelectEditableTemplate = '<select class=\"form-control input-sm\" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';
      $scope.cellSelectEditableTemplate2 = '<select class=\"form-control input-sm\" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in pleveles" ng-blur="updateEntity(row)" />';
      $scope.cellSelectEditableTemplate3 = '<select class=\"form-control input-sm\" ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in sestimes | orderBy:name:desc" ng-blur="updateEntity(row)" />';
      $scope.buttonCellTemplate = '<div style=\"padding:4px;\" class=\"btn-group btn-group-sm\"><a href=\"#exhibitors/{{row.getProperty(col.field)}}\" class=\"btn btn-info\" >View</a></div>';
            $scope.list = exhibitors.data;
            $scope.gridOptions = { 
                  data: 'list',
                  //showGroupPanel: true,
                  //jqueryUIDraggable: true,
                  enableRowSelection: true,
                  enableCellEdit: true,
                  multiSelect: false,
                  headerRowHeight: 50,
                  rowHeight: 38,
                  columnDefs: [
                        {field:'company', displayName:'Company', enableCellEdit: true, width: 150, editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate:  $scope.regCellTemplate},
                        {field:'committed', displayName:'Committed', enableCellEdit: true, width: 100,  editableCellTemplate: $scope.cellSelectEditableTemplate, cellTemplate: '<div style=\"height:36px;\" ng-class="{dangerGrid: row.getProperty(col.field) == 0, successGrid: row.getProperty(col.field) == 1}"><div class="ngCellText">{{row.getProperty(col.field)  | CommittedFilter }}</div></div>'},
                        {field:'contract', displayName:'Contract', enableCellEdit: true, width: 100,   editableCellTemplate: $scope.cellSelectEditableTemplate, cellTemplate: '<div style=\"height:36px;\" ng-class="{dangerGrid: row.getProperty(col.field) == 0, successGrid: row.getProperty(col.field) == 1}"><div class="ngCellText">{{row.getProperty(col.field)  | ContractFilter }}</div></div>'},
                      
                        {field:'forcast_revenue', displayName:'Forcast Revenue', enableCellEdit: true, width: 150,  editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate:  $scope.regCellTemplate},
                        {field:'payment', displayName:'Payment', enableCellEdit: true, width: 100,  editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate: '<div style=\"height:36px;\" ng-class="{dangerGrid: row.getProperty(col.field) == 0, warningGrid: row.getProperty(col.field) == 1, successGrid: row.getProperty(col.field) == 2}"><div class="ngCellText">{{row.getProperty(col.field) | PaymentFilter}}</div></div>'},
                        {field:'payment_method', displayName:'Payment method', enableCellEdit: true, width: 150,  editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate:  $scope.regCellTemplate},
                        {field:'deposit_due', displayName:'Deposit due', enableCellEdit: true, width: 120,  editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate: '<div style=\"height:36px;\" ng-class="{dangerGrid: row.getProperty(col.field) > 0, successGrid: row.getProperty(col.field) == 0}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
                        {field:'amount_paid', displayName:'Amount paid', enableCellEdit: true, width: 120,  editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate: '<div style=\"height:36px;\" ng-class="{dangerGrid: row.getProperty(col.field) == 0, successGrid: row.getProperty(col.field) > 0}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
                        {field:'total_due', displayName:'Total due', enableCellEdit: true, width: 120,  editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate: '<div style=\"height:36px;\" ng-class="{dangerGrid: row.getProperty(col.field) > 0, successGrid: row.getProperty(col.field) == 0}"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
                        {field:'plevel_proposed', displayName:'Level Proposed', width: 200,  enableCellEdit: true, editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate:  $scope.regCellTemplate},
                        {field:'plevel', displayName:'Partner level', enableCellEdit: true,  width: 100, editableCellTemplate: $scope.cellSelectEditableTemplate2, cellTemplate: '<div style=\"height:36px;\" ng-class="{bgExhibitor: row.getProperty(col.field) == \'Exhibitor\', bgBronze: row.getProperty(col.field) == \'Bronze\', bgSilver: row.getProperty(col.field) == \'Silver\', bgGold: row.getProperty(col.field) == \'Gold\', bgPlatinum: row.getProperty(col.field) == \'Platinum\' }"><div class="ngCellText">{{row.getProperty(col.field)}}</div></div>'},
                        {field:'booth', displayName:'Booth', enableCellEdit: true,  width: 60, editableCellTemplate: $scope.cellInputEditableTemplate, cellTemplate: $scope.centeredCellTemplate},
                        {field:'speaker_time', displayName:'Speaker time', enableCellEdit: true,  width: 100, editableCellTemplate: $scope.cellSelectEditableTemplate3, cellTemplate: $scope.timeCellTemplate},
                        {field:'id', displayName:'Options', width: '20%',   cellTemplate: $scope.buttonCellTemplate}],
                  showColumnMenu: true,
                  filterOptions: $scope.filterOptions
                 // enableCellEditOnFocus: true,
            };
      $scope.$watch('query',function(value) {
            //console.log('query',value,$scope);
            if (value && $scope.filterOptions)  $scope.filterOptions.filterText = value;
      });
      $scope.eft = $(".gridStyle input[ng-model]").scope();
      $scope.updateEntity = function(row) {
          if(!$scope.save) {
            $scope.save = { promise: null, pending: false, row: null };
          }
          $scope.save.row = row.rowIndex;
          if(!$scope.save.pending) {
            $scope.save.pending = true;
            $scope.save.promise = $timeout(function(){
              // $scope.list[$scope.save.row].$update();
              var saveData = {
                        id: $scope.list[$scope.save.row].id,
                        company: $scope.list[$scope.save.row].company, 
                        committed: $scope.list[$scope.save.row].committed ,
                        contract: $scope.list[$scope.save.row].contract,
                        forcast_revenue: $scope.list[$scope.save.row].forcast_revenue,
                        payment: $scope.list[$scope.save.row].payment,
                        payment_method: $scope.list[$scope.save.row].payment_method,
                        deposit_due: $scope.list[$scope.save.row].deposit_due,
                        total_due: $scope.list[$scope.save.row].total_due,
                        amount_paid: $scope.list[$scope.save.row].amount_paid,
                        plevel_proposed: $scope.list[$scope.save.row].plevel_proposed,
                        plevel: $scope.list[$scope.save.row].plevel,
                        booth: $scope.list[$scope.save.row].booth,
                        speaker_time: $scope.list[$scope.save.row].speaker_time
              };
              //console.log(saveData);
              $http({
                method: 'put',
                url: 'exhibitors/' + $scope.list[$scope.save.row].id,
                data: saveData
              })
              .success(function(data){
                console.log(data);
              });
              $scope.save.pending = false; 
            }, 500);
          }    
      };
}])


