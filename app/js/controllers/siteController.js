'use strict';

/* Controllers */

angular.module('myApp.siteController', ['firebase'])

.controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
		syncData('syncedValue').$bind($scope, 'syncedValue');
		var keys = syncData('syncedValue').$getIndex($scope, 'syncedValue');
		keys.forEach(function(key, i) {
					 // console.log(i, $scope.exhbitors[key]); // prints items in order they appear in Firebase
		});
}])
.controller("DashboardController", ['$firebase', 'Firebase', '$scope', 'loginService', 'syncData', '$location', function($firebase, Firebase, $scope, loginService, syncData, $location){

	//syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');
	//$scope.auth.user = $getCurrentUser();

	//$scope.sortTiles = $scope.auth.user.tiles;

		//$scope.titles = "Dashboard";
	$scope.editTiles = function(){
		$scope.editable = true;
	};


	var tmpList = [];

	 for (var i = 1; i <= 6; i++){
		    tmpList.push({
		      text: 'Item ' + i,
		      value: i
		    });
		  }

	$scope.list = tmpList;

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
  
}]);




