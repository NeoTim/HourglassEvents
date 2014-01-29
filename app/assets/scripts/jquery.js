'use strict';

/* Controllers */

angular.module('eventsApp.controllers', ['eventsApp.services', 'ngGrid', 'firebase', 'googlechart',])


// LOGIN CONTROLLER
.controller("LoginController", ['$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
  $scope.credentials = { email: "", password: "" };

  $scope.login = function() {
    AuthenticationService.login($scope.credentials).success(function() {
      $location.path('/dashboard');
    });
  };
}])


// EXHIBITOR DETAILS CONTROLLER
.controller("ExhibitorDetailCtrl", ['$scope', '$routeParams', 'ExhibitorService', 'ContactsService', function($scope, $routeParams, ExhibitorService, ContactsService) {
      //$scope.exhibitor = Exhibitor.data;
      $scope.contacts = ContactsService.get({exhibitorId: $routeParams.exhibitorId}, function(contacts){
            var PrimaryContact = _.filter(contacts, function(contact){return contact.primary == 1});
            $scope.primary = PrimaryContact[0];
            $scope.AllContacts = contacts;
      });
      $scope.exh = ExhibitorService.get({exhibitorId: $routeParams.exhibitorId}, function(exh) {
            $scope.title = exh.company;
            
      });
}])

//var fb = new Firebase('https://hourglass-events.firebaseio-demo.com/');

// DASHBOARD CONTROLLER

.controller("DashboardController", ['$firebase', '$scope', '$location', 'AuthenticationService',
      function($firebase, $scope, $location, AuthenticationService) {
      $scope.title = "Dashboard";





            $scope.logout = function() {
            AuthenticationService.logout().success(function() {
                  $location.path('/login');
            });
      };
}])

.controller("MyTableController" ['syncData', 'ExhibitorsFireService', '$scope', function(syncData, service, $scope){

}])

.controller("TestController", [ '$document','syncData', '$scope', '$timeout', 'StatusesConstant', 'SessionTimeConstant', 'PlevelesConstant', 'ExhibitorsFireService',
  function($document, syncData, $scope, $timeout, StatusesConstant, SessionTimeConstant, PlevelesConstant, fireService) {
         syncData('syncedValue').$bind($scope, 'syncedValue');
         $scope.exhibitors = fireService;

         $scope.editRowVals = function(id){
                  // var ellm = $scope.editStatus_ += id;
                  // var ellms = $scope.startStatus_ += id;
                  // //$scope.saveStatus_ += id =addClass('hidden');
                  // // /$scope.editStatus_ += id .removeClass("hidden");
                  // angular.element($document[0].querySelector('button.' + ellm)).addClass("hidden");
                  // angular.element($document[0].querySelector('button.' + ellms)).removeClass("hidden");
                  //angular.element('div#' + $scope.editStatus_ += id).removeClass("hidden");
         }
         $scope.saveRowVals = function(){
                  //$scope.editStatus = "";
                  //scope.saveStatus = "hidden";
                  $scope.checkedmodel == true
         }

     

      $scope.doneCompany = function(value){
            $scope.selected = false;
      }

      $scope.title = 'Exhibitors';
      $scope.filterOptions = {
            filterText: "",
            useExternalFilter: false
      };  



      
     
}])

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
.factory("addTodosService", function($http){
  return {
    get: function() {
        return $http.get('exhibitors');
    }
  };
})

// TODOS CONTROLLER
.controller('todoController', function TodoCtrl($scope, $location, $firebase, ExhibitorService, $routeParams) {
    $scope.exh = ExhibitorService.get({exhibitorId: $routeParams.exhibitorId}, function(exh) {
            
            $scope.urlpath = '/exhibitors/' + exh.id;
            
            if($location.path() == '/dashboard') {
                  var globalTodoRef = new Firebase('https://hourglass-events.firebaseio.com/globals/todos');
                  $scope.fireRef = globalTodoRef;
            }

            if($location.path() == $scope.urlpath) {
                   var exhibitorTodo = new Firebase('https://hourglass-events.firebaseio.com/' + $scope.urlpath + '/todos');
                   $scope.fireRef = exhibitorTodo;
            }
            
            //$firebase(fireRef.child("exhibitors/" + $scope.exhibitorId));


            



            $scope.$watch('todos', function () {
              var total = 0;
              var remaining = 0;
              $scope.todos.$getIndex().forEach(function (index) {
                    var todo = $scope.todos[index];
                // Skip invalid entries so they don't break the entire app.
                    if (!todo || !todo.title) {
                          return;
                    }

                    total++;
                    if (todo.completed === false) {
                      remaining++;
                    }
              });
              $scope.totalCount = total;
              $scope.remainingCount = remaining;
              $scope.completedCount = total - remaining;
              $scope.allChecked = remaining === 0;
            }, true);

            $scope.addTodo = function () {
              var newTodo = $scope.newTodo.trim();
              if (!newTodo.length) {
                return;
              }
              $scope.todos.$add({
                title: newTodo,
                completed: false
              });
              $scope.newTodo = '';
            };

            $scope.editTodo = function (id) {
              $scope.editedTodo = $scope.todos[id];
              $scope.originalTodo = angular.extend({}, $scope.editedTodo);
            };

            $scope.doneEditing = function (id) {
              $scope.editedTodo = null;
              var title = $scope.todos[id].title.trim();
              if (title) {
                $scope.todos.$save(id);
              } else {
                $scope.removeTodo(id);
              }
            };

            $scope.revertEditing = function (id) {
              $scope.todos[id] = $scope.originalTodo;
              $scope.doneEditing(id);
            };

            $scope.removeTodo = function (id) {
              $scope.todos.$remove(id);
            };

            $scope.toggleCompleted = function (id) {
              var todo = $scope.todos[id];
              todo.completed = !todo.completed;
              $scope.todos.$save(id);
            };

            $scope.clearCompletedTodos = function () {
              angular.forEach($scope.todos.$getIndex(), function (index) {
                if ($scope.todos[index].completed) {
                  $scope.todos.$remove(index);
                }
              });
            };

            $scope.markAll = function (allCompleted) {
              angular.forEach($scope.todos.$getIndex(), function (index) {
                $scope.todos[index].completed = !allCompleted;
              });
              $scope.todos.$save();
            };

            $scope.newTodo = '';
            $scope.editedTodo = null;

            if ($location.path() === $scope.urlpath ) {
              $location.path($scope.urlpath);
            }
            $scope.location = $location;

            $scope.todos = $firebase($scope.fireRef);
            // Bind the todos to the firebase provider.
           
   });
})



.controller('NoteCtrl', function NoteCtrl($scope, $location, $firebase, ExhibitorService, $routeParams) {
    var exhibitor = ExhibitorService.data;
    $scope.exhibitor = ExhibitorService.get({exhibitorId: $routeParams.exhibitorId}, function(exhibitor) {
            $scope.title = exhibitor.company;
            
     
            $scope.urlpath = '/exhibitors/' + exhibitor.id;
            var url = 'https://hourglass-events.firebaseio.com/' + $scope.urlpath + '/notes';
            var fireRef = new Firebase(url);
            //$firebase(fireRef.child("exhibitors/" + $scope.exhibitorId));

            $scope.$watch('notes', function () {
              var total = 0;
              var remaining = 0;
              $scope.notes.$getIndex().forEach(function (index) {
                    var note = $scope.notes[index];
                // Skip invalid entries so they don't break the entire app.
                    if (!note || !note.title) {
                          return;
                    }

                    total++;
                    if (note.completed === false) {
                      remaining++;
                    }
              });
              $scope.totalCount = total;
              $scope.remainingCount = remaining;
              $scope.completedCount = total - remaining;
              $scope.allChecked = remaining === 0;
            }, true);

            $scope.addNote = function () {
              var newNote = $scope.newNote.trim();
              if (!newNote.length) {
                return;
              }
              $scope.notes.$add({
                title: newNote,
                completed: false
              });
              $scope.newNote = '';
            };

            $scope.editNote = function (id) {
              $scope.editedNote = $scope.notes[id];
              $scope.originalNote = angular.extend({}, $scope.editedNote);
            };

            $scope.doneEditing = function (id) {
              $scope.editedNote = null;
              var title = $scope.notes[id].title.trim();
              if (title) {
                $scope.notes.$save(id);
              } else {
                $scope.removeNote(id);
              }
            };

            $scope.revertEditing = function (id) {
              $scope.notes[id] = $scope.originalNote;
              $scope.doneEditing(id);
            };

            $scope.removeNote = function (id) {
              $scope.notes.$remove(id);
            };

            $scope.toggleCompleted = function (id) {
              var note = $scope.notes[id];
              note.completed = !note.completed;
              $scope.notes.$save(id);
            };

            $scope.clearCompletedNotes = function () {
              angular.forEach($scope.notes.$getIndex(), function (index) {
                if ($scope.notes[index].completed) {
                  $scope.notes.$remove(index);
                }
              });
            };

            $scope.markAll = function (allCompleted) {
              angular.forEach($scope.notes.$getIndex(), function (index) {
                $scope.notes[index].completed = !allCompleted;
              });
              $scope.notes.$save();
            };

            $scope.newNote = '';
            $scope.editedNote = null;

            if ($location.path() === $scope.urlpath ) {
              $location.path($scope.urlpath);
            }
            $scope.location = $location;

            // Bind the notes to the firebase provider.
            $scope.notes = $firebase(fireRef);
   });
});
// .controller('FireCrtl', function($scope, firebaseCollection, firebaseBinding) {
//   $scope.books = firebaseCollection('https://angular.firebaseio.com/books');
//   $scope.userInfo = {
//     firstName: 'Jo', lastName: 'Bloggs'
//   };
//   var userPromise = firebaseBinding('https://angular.firebaseio.com/userInfo', $scope, 'userInfo');
//   userPromise.then(function(userInfo) {
//     console.log(userInfo, userInfo.firstName, userInfo.lastName);
//   });
// });


