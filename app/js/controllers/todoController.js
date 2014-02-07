'use strict';

/* Controllers */

angular.module('myApp.todoController', [ 'firebase'])

// ADD TODO CONTROLLER
.factory("addTodosService", function($http){
  return {
	 get: function() {
		  return $http.get('exhibitors');
	 }
  };
})

// TODOS CONTROLLER
.controller('todoController', function TodoCtrl($scope, $location, $firebase) {
	
				
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
.controller('NoteCtrl', function NoteCtrl($scope, $location, $firebase) {
			
	$scope.firepath = $location.path();
	
	
	if($location.path() == '/dashboard') {
			var globalNotesRef = new Firebase('https://hourglass-events.firebaseio.com/notes');
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
