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
.controller("ExhibitorDetailCtrl", [ '$firebase', '$scope', '$routeParams', '$location', function($firebase, $scope, $routeParams, $location) {
		//$scope.exhibitor = Exhibitor.data;

		var exhibitorUrl = $location.path()
	
		 var exhibitorRef = new Firebase("https://hourglass-events.firebaseIO.com/" + exhibitorUrl);
	 	 $scope.exh = $firebase(exhibitorRef);
	 	 

		// $scope.contacts = ContactsService.get({exhibitorId: $routeParams.exhibitorId}, function(contacts){
		// 		var PrimaryContact = _.filter(contacts, function(contact){return contact.primary == 1});
		// 		$scope.primary = PrimaryContact[0];
		// 		$scope.AllContacts = contacts;
		// });
		//$scope.exh = ExhibitorService.get({exhibitorId: $routeParams.exhibitorId}, function(exh) {		
		//});
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


.controller("TestController", [ '$firebase','syncData', '$scope', '$timeout', 'StatusesConstant', 'SessionTimeConstant', 'PlevelesConstant', 'ExhibitorsFireService',
  	function($firebase, syncData, $scope, $timeout, StatusesConstant, SessionTimeConstant, PlevelesConstant, fireService) {

	syncData('syncedValue').$bind($scope, 'syncedValue');
	//$scope.exhibitors = fireService;

	 var exhibitorRef = new Firebase("https://hourglass-events.firebaseIO.com/exhibitors");
	 $scope.exhibitors = $firebase(exhibitorRef);
			 
		
	$scope.title = 'Exhibitors';
	$scope.doneEditing = function (id, field, newval) {

			  var updateRef  = new Firebase("https://hourglass-events.firebaseIO.com/exhibitors/" + id);

		 //console.log(updateRef);
			  updateRef.child(field).set(newval);
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
.controller('todoController', function TodoCtrl($scope, $location, $firebase, $routeParams) {
	
				
	$scope.firepath = $location.path();
	
	
	if($location.path() == '/dashboard') {
			var globalTodoRef = new Firebase('https://hourglass-events.firebaseio.com/globals/todos');
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
	
});