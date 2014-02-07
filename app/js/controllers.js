'use strict';

/* Controllers */

angular.module('myApp.controllers', [ 'firebase', 'ui.calendar', 'ngTable'])
	.controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
			syncData('syncedValue').$bind($scope, 'syncedValue');
			var keys = syncData('syncedValue').$getIndex($scope, 'syncedValue');
			keys.forEach(function(key, i) {
						 // console.log(i, $scope.exhbitors[key]); // prints items in order they appear in Firebase
			});
	}])

//CONTACT CONTROLLER

.controller("contactController", ['$firebase', 'Firebase', '$scope', function($firebase, Firebase, $scope){
	$scope.init = function(exhibitor, item){
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/exhibitors/" + exhibitor + "/" + item;
		$scope.item = $firebase(new Firebase(fireBaseUrl + item));

		$scope.update = function(field, newval){
			$scope.item = new Firebase(fireBaseUrl + item);
			$scope.item.child(field).set(newval);
		}

	

	}

}])

// EXHIBITOR DETAILS CONTROLLER
.controller("ExhibitorDetailCtrl", [ '$firebase', '$scope', '$routeParams', '$location', function($firebase, $scope, $routeParams, $location) {
		//$scope.exhibitor = Exhibitor.data;

		var exhibitorUrl = $location.path()
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/" + exhibitorUrl + "/contacts";
		 var exhibitorRef = new Firebase("https://hourglass-events.firebaseIO.com/" + exhibitorUrl);
		 $scope.exh = $firebase(exhibitorRef);

		 var contactRef = $firebase(new Firebase(fireBaseUrl));
		 
		 $scope.removeExhibitor = function(){
			exhibitorRef.remove();
		 };

		 var errId = 0;
		 
			// creates new incremental record
		$scope.addContact = function() {

			
			
				exhibitorRef.child('counter').transaction(function(currentValue) {
							return (currentValue||0) + 1
				}, function(err, committed, ss) {
					if( err ) {
						setError(err);
					}
							else if( committed ) {
					// if counter update succeeds, then create record
					// probably want a recourse for failures too
						addRecord(ss.val()); 
					}
				});
				function addRecord(id) {
				
					setTimeout(function() {
						$scope.contactRef.child(id).set({id: id}, function(err) {
							err && setError(err);
						});  
						
					});
				};
		};
		 $('#inc').on('click', incId);
			var errId = 0;
			// creates a new, incremental record
			function incId() {
					// increment the counter
				$scope.exhibitorRef.child('counter').transaction(function(currentValue) {
							return (currentValue||0) + 1
				}, function(err, committed, ss) {
					if( err ) {
						setError(err);
					}
							else if( committed ) {
					// if counter update succeeds, then create record
					// probably want a recourse for failures too
						addRecord(ss.val()); 
					}
				});
			};
			// creates new incremental record
			function addRecord(id) {
			
				setTimeout(function() {
					$scope.contactRef.child(id).set({id: id}, function(err) {
						err && setError(err);
					});  
					
				});
			};
				
				// creates new incremental record
		


}])

// ====  DASHBOARD ======


// DASHBOARD CONTROLLER
.controller("DashboardController", ['$firebase', 'Firebase', '$scope', 'loginService', 'syncData', '$location', function($firebase, Firebase, $scope, loginService, syncData, $location){

	//syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
	//$scope.auth.user = $getCurrentUser();

	//$scope.sortTiles = $scope.auth.user.tiles;

		//$scope.titles = "Dashboard";
	$scope.editTiles = function(){
		$scope.editable = true;
	};

}])

// SORTABLE CONTROLLER
.controller("sortableController", ['$firebase', 'Firebase', '$scope', 'syncData', function($firebase, Firebase, $scope, loginService, syncData){
	//syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
	//$scope.init = function(tile) {

		//$scope.newMessage = null;

		// /$scope.titles = $getCurrentUser().tiles.id;

		  
  
/*  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
    update: function(e, ui) {
      var logEntry = tmpList.map(function(i){
        return i.value;
      }).join(', ');
      $scope.sortingLog.push('Update: ' + logEntry);
    },
    stop: function(e, ui) {
      // this callback has the changed model
      var logEntry = tmpList.map(function(i){
        return i.value;
      }).join(', ');
      $scope.sortingLog.push('Stop: ' + logEntry);
    }
  };*/
		// constrain number of messages by limit into syncData
		// add the array into $scope.messages
		//$scope.titles = syncData('user' , 10);
		// console.log($scope.messages);
		/*$scope.list = [
			{ 'text': 'exhibitors', 'color':'green', 'icon':'group' },
			{ 'text': 'Calendar', 'color':'blue', 'icon':'group' },
			{ 'text': 'exhibitors', 'color':'green', 'icon':'group' },
			{ 'text': 'exhibitors', 'color':'green', 'icon':'group' },
			{ 'text': 'O', 'drag': true },
			{ 'text': 'M', 'drag': true },
			{ 'text': 'L', 'drag': true },
			{ 'text': 'G', 'drag': true },
			{ 'text': 'U', 'drag': true }
		];
		*/
		 var tmpList = [];
  
		  for (var i = 1; i <= 6; i++){
		    tmpList.push({
		      text: 'Item ' + i,
		      value: i
		    });
		  }
		  
		$scope.list = tmpList;
		  
		$scope.sortingLog = [];
		  
		$scope.sortableOptions = {
			update: function(e, ui) {
				var logEntry = tmpList.map(function(i){
					console.log(i.value = i.text);
				return i.value;
			}).join(', ');

			$scope.sortingLog.push('Update: ' + logEntry);
			},
			stop: function(e, ui) {
				// this callback has the changed model
				var logEntry = tmpList.map(function(i){
				return i.value;
			}).join(', ');

				$scope.sortingLog.push('Stop: ' + logEntry);

			}
		};

	//}
  
}])


.controller("dashboardDrag", ['$firebase', 'Firebase', '$scope', 'syncData', function($firebase, Firebase, $scope, syncData){

	syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

	var fireBaseUrl = "https://hourglass-events.firebaseio.com/exhibitors/";
	$scope.newTile = null;
	$scope.intel = syncData('messages', 10);

        this.dropCallback = function(event, ui, title, $index) {
          if ($scope.list1.map(function(item) { return item.title; }).join('') === 'GOLLUM') {
            $scope.list1.forEach(function(value, key) { $scope.list1[key].drag = false; });
          }
        };
}])

.controller("tblCrtl", [ '$firebase','syncData', '$scope', '$timeout','$filter', 'ngTableParams',
	function($firebase, syncData, $scope, $timeout, $filter, ngTableParams) {

	$scope.fireRef = new Firebase("https://hourglass-events.firebaseIO.com/");
	$scope.exhibitorRef = $scope.fireRef.child('exhibitors');

	$scope.exhibitors = $scope.exhibitorRef;
	var $data = [];	

	$scope.exhibitorRef.on('child_added', function(ss) {
			 $data.push(ss.val());
			 $scope.tableParams.reload();
	 });
	$scope.ChildScope.on('child_changed', function(ss) {
			 $data.push(ss.val());
			 $scope.tableParams.reload();
	 });
	$scope.exhibitorRef.on('child_removed', function(ss) {
			 $data.push(ss.val());
			 $scope.tableParams.reload();
	 });

	// $scope.exhibitorRef.transaction(function(currentData) {
	//        $data.push(currentData);
	//        //$scope.tableParams.reload();
	//  });

	 $scope.tableParams = new ngTableParams({
			 page: 1,
			 count: 100,
			 
			 sorting: {
				company: 'asc'
			 }
	 }, {
		total: $data.length, getData: function($defer, params) {
			var filteredData = $filter('filter')($data, $scope.filter);
			var orderedData = params.sorting() ?
				$filter('orderBy')(filteredData, params.orderBy()) :
				$data;
			
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});

}])



.controller("companyCrtl", ['$firebase', 'Firebase', '$scope', function($firebase, Firebase, $scope) {
	$scope.cellinit = function(id) {
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/exhibitors/";
		$scope.exhibitor = new Firebase(fireBaseUrl + id);

			$scope.update = function(newval) {
				//var companyRef = new Firebase(fireBaseUrl + id + '/company');
				$scope.exhibitor.child('company').set(newval);
			};
	};
}])

.controller("fireDataCrtl", ['$firebase', 'Firebase', '$scope', function($firebase, Firebase, $scope){
	$scope.init = function(item){
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/exhibitors/";
		$scope.item = $firebase(new Firebase(fireBaseUrl + item));

		$scope.update = function(field, newval){
			$scope.item = new Firebase(fireBaseUrl + item);
			$scope.item.child(field).set(newval);
		}
		$scope.item.$bind($scope, "remoteItem");
		$scope.item.$on('loaded', checkData);
      		$scope.item.$on('change', checkData);
		function checkData() {
		      	if ($scope.item.amount_paid == $scope.item.forcast_revenue) {
				$scope.paymentExp = {label: "success",  icon: "check"};
				$scope.methodExp = true;
				$scope.duesExp = false;
			} else if($scope.item.amount_paid  !== "0.00"){
				$scope.paymentExp = {label: "warning",  icon: "refresh"};
				$scope.methodExp = true;
				$scope.duesExp = $scope.item.forcast_revenue - $scope.item.amount_paid;
			} else {
				$scope.paymentExp = {label: "danger",  icon: "times"};
				$scope.methodExp = false;
				$scope.duesExp = $scope.item.forcast_revenue;
			};
			
		};

	}
}])

.controller("exhibitorsControl", [ '$firebase', 'Firebase', 'syncData', '$scope', '$timeout','$filter',
	function($firebase, Firebase, syncData, $scope, $timeout, $filter) {
		$scope.fireRef = new Firebase("https://hourglass-events.firebaseIO.com/");
		//$scope.exhibitors = $firebase($scope.exhibitorRef);
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/exhibitors/";
		$scope.exhibitors = $firebase(new Firebase(fireBaseUrl));
		$scope.exhibitorRef = new Firebase(fireBaseUrl);


		
		 	//$scope.exhibitors.$add({company: "New Company", soft: 0, });
		 $scope.fireRef = new Firebase("https://hourglass-events.firebaseIO.com/");
		 $('#inc').on('click', incId);
			var errId = 0;
			// creates a new, incremental record
			function incId() {
					// increment the counter
				$scope.fireRef.child('counter').transaction(function(currentValue) {
							return (currentValue||0) + 1
				}, function(err, committed, ss) {
					if( err ) {
						setError(err);
					}
							else if( committed ) {
					// if counter update succeeds, then create record
					// probably want a recourse for failures too
						addRecord(ss.val()); 
					}
				});
			};
			// creates new incremental record
			function addRecord(id) {
			
				setTimeout(function() {
					$scope.exhibitorRef.child(id).set({id: id, soft: 0, company: 'A New Exhibitor'}, function(err) {
						err && setError(err);
					});  
					
				});
			};	
}])

// EXHIBITOR CONTROLLER
.controller("exhibitorCrtl", [ '$firebase', 'Firebase', 'syncData', '$scope', '$timeout','$filter',
	function($firebase, Firebase, syncData, $scope, $timeout, $filter) {

	  $scope.init = function(exhibitor) {
			// bind Firebase data to scope variable 'data'
			var fireBaseUrl = "https://hourglass-events.firebaseio.com/exhibitors/";
			$scope.data = $firebase(new Firebase(fireBaseUrl + exhibitor));
			
			
			


			$scope.update = function (field, newval) {
				//console.log(this);
				$scope.childRef = new Firebase(fireBaseUrl + exhibitor);
				$scope.childRef.child(field).set(newval);
			 };
			$scope.softDelete = function(id){
				$scope.exhibitorRef.child(id).child('soft').set( '1' );
				$scope.tableParams.reload();
				console.log(id);
			};
			
			


	};
 }])

// TRASH CONTROLLER
.controller("TrashController", [ '$firebase','syncData', '$scope', '$timeout', '$filter', 'ngTableParams', 
	function($firebase, syncData, $scope, $timeout, $filter, ngTableParams) {

	syncData('syncedValue').$bind($scope, 'syncedValue');
	//$scope.exhibitors = fireService;

	 var exhibitorRef = new Firebase("https://hourglass-events.firebaseIO.com/exhibitors");
	 $scope.exhibitors = $firebase(exhibitorRef);


	$scope.data = [];
	 


	 exhibitorRef.on('child_added', function(ss) {
			 $scope.data.push(ss.val());
			 $scope.tableParams.reload();
	 })
		 
	 $scope.tableParams = new ngTableParams({
			 page: 1,
			 count: 10,
			 filter: {
					 company: 'A' //       initial filter
			 },
			 sorting: {
				id: 'asc'
			 }
	 }, {
		total: $scope.data.length, getData: function($defer, params) {
			// var filteredData = params.filter() ?
			// 	$filter('filter')($scope.data, params.filter()) :
			// 	$scope.data;
			var filteredData = $filter('filter')($scope.data, $scope.filter);
			var orderedData = params.sorting() ?
				$filter('orderBy')(filteredData, params.orderBy()) :
				$scope.data;
			//var orderedData = params.sorting() ? $filter('orderBy')($scope.data, params.orderBy()) : $scope.data;
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		}
	});
	 $scope.$watch("filter.$", function () {
			$scope.tableParams.reload();
			$scope.tableParams.page(1); //Add this to go to the first page in the new pagging
	});


	 $scope.restoreItem = function(id){
		  var updateRef  = new Firebase("https://hourglass-events.firebaseIO.com/exhibitors/" + id);

		updateRef.child('soft').set( '0' );
		// console.log(id);
	};

	$scope.removeItem = function(id){
		  var updateRef  = new Firebase("https://hourglass-events.firebaseIO.com/exhibitors/" + id);

		updateRef.remove();
		// console.log(id);
		$scope.tableParams.reload();
	};
}])

// CALENDAR CONTROLLER
.controller("calendarController", [ '$firebase','syncData', '$scope', '$timeout',
	function($firebase, syncData, $scope, $timeout) {
	syncData('syncedValue').$bind($scope, 'syncedValue');
	//$scope.exhibitors = fireService;

	var eventsRef = new Firebase("https://hourglass-events.firebaseIO.com/globals/events");

  }])

.controller("CalendarCtrl", ["$scope", function($scope){
	var date = new Date();
	 var d = date.getDate();
	 var m = date.getMonth();
	 var y = date.getFullYear();
	 /* event source that pulls from google.com */
	 $scope.eventSource = {
				url: "http://www.google.com/calendar/feeds/hisimagination.com_0ep3sih7sgcs0idiprcif1jom8%40group.calendar.google.com/public/basic",
				className: 'gcal-event',           // an option!
				editable: true,
				currentTimezone: 'America/Chicago' // an option!
	 };
	 /* event source that contains custom events on the scope */
	 // $scope.events = [

	 // ];
	 /* event source that calls a function on every view switch */
	 $scope.eventsF = function (start, end, callback) {
		var s = new Date(start).getTime() / 1000;
		var e = new Date(end).getTime() / 1000;
		var m = new Date(start).getMonth();
		var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
		callback(events);
	 };
	 /* alert on eventClick */
	 $scope.addEventOnClick = function( date, allDay, jsEvent, view ){
		  $scope.$apply(function(){
			 $scope.alertMessage = ('Day Clicked ' + date);
		  });
	 };
	 /* alert on Drop */
	  $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
		  $scope.$apply(function(){
			 $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
		  });
	 };
	 /* alert on Resize */
	 $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
		  $scope.$apply(function(){
			 $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
		  });
	 };
	 /* add and removes an event source of choice */
	 $scope.addRemoveEventSource = function(sources,source) {
		var canAdd = 0;
		angular.forEach(sources,function(value, key){
		  if(sources[key] === source){
			 sources.splice(key,1);
			 canAdd = 1;
		  }
		});
		if(canAdd === 0){
		  sources.push(source);
		}
	 };
	 /* add custom event*/
	 $scope.addEvent = function() {
		$scope.events.push({
		  title: 'Open Sesame',
		  start: new Date(y, m, 28),
		  end: new Date(y, m, 29),
		  className: ['openSesame']
		});
	 };
	 /* remove event */
	 $scope.remove = function(index) {
		$scope.events.splice(index,1);
	 };
	 /* config object */
	 $scope.uiConfig = {
		calendar:{
		  height: 450,
		  editable: true,
		  header:{
			 left: 'month basicWeek basicDay agendaWeek agendaDay',
			 center: 'title',
			 right: 'today prev,next'
		  },
		  dayClick: $scope.alertEventOnClick,
		  eventDrop: $scope.alertOnDrop,
		  eventResize: $scope.alertOnResize
		}
	 };
	 /* event sources array*/
	 $scope.eventSources = [$scope.eventSource, $scope.eventsF];
}])


// ADD TODO CONTROLLER
.factory("addTodosService", function($http){
  return {
	 get: function() {
		  return $http.get('exhibitors');
	 }
  };
})

// TODOS CONTROLLER
.controller('todoController', function TodoCtrl($scope, $location, $firebase, $routeParams) {
	
				
	$scope.firepath = $location.path();
	
	
	if($location.path() == '/dashboard') {

			var globalTodoRef = new Firebase('https://hourglass-events.firebaseio.com/todos');
			$scope.fireRef = globalTodoRef;
	}else{
		
		 var exhibitorTodo = new Firebase('https://hourglass-events.firebaseio.com/' + $scope.firepath + '/todos');
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
})

// NOTES CONTROLLER
.controller('NoteCtrl', function NoteCtrl($scope, $location, $firebase, $routeParams) {
			
	$scope.firepath = $location.path();
	
	
	if($location.path() == '/dashboard') {
			var globalNotesRef = new Firebase('https://hourglass-events.firebaseio.com/globals/notes');
			$scope.fireRef = globalNotesRef;
	}else{
		

		 var exhibitorNotes = new Firebase('https://hourglass-events.firebaseio.com/' + $scope.firepath + '/notes');
		 $scope.fireRef = exhibitorNotes;
	
	}
	

	
	
	
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
	$scope.notes = $firebase( $scope.fireRef);
})

.controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
		$scope.newMessage = null;

		// constrain number of messages by limit into syncData
		// add the array into $scope.messages
		$scope.messages = syncData('messages', 10);
		// console.log($scope.messages);

		// add new messages to the list
		$scope.addMessage = function() {
			if( $scope.newMessage ) {
				$scope.messages.$add({text: $scope.newMessage});
				$scope.newMessage = null;
			}
		};
}])
