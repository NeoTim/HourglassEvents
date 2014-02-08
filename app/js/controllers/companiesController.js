'use strict';

/* Controllers */

angular.module('myApp.companiesController', ['firebase', 'ui.router', 'ng-firebase'])

.controller("companiesCtrl", ['$scope', 'fireCompanies', function($scope, fireCompanies){

			fireCompanies.copyToScope($scope,'companies');

}])


.controller("CompaniesControl", [ 'Firebase', 'syncData', '$scope', '$timeout','$filter', '$stateParams', 'firebaseCollection', 'firebaseBinding',
	function( Firebase, syncData, $scope, $timeout, $filter, $stateParams, firbaseCollection) {
		//$scope.exhibitors = $firebase($scope.exhibitorRef);
		var fireBaseUrl = new Firebase("https://hourglass-events.firebaseio.com/companies");
		//$scope.companies = firbaseCollection(fireBaseUrl);
		

		$scope.companies =syncData('companies');
		fireBaseUrl.on('value', function(snapshot) {
		})		

		$scope.update = function(id, field, newval){
			var itemRef = new Firebase("https://hourglass-events.firebaseio.com/companies/" + id + "/" + field);
			itemRef.transaction(function(currentVal){
				return newval;
			});
		}

		$scope.title = 'Companies';

}])


.controller('editcomp', function($scope, $firebase){
		
})

.controller("companyListCtrl", ['$firebase', 'Firebase', '$scope', function($firebase, Firebase, $scope){
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



.controller("editCompanyCtrl", ['$scope', 'fireCompanies', '$firebase', function($scope, fireCompanies, $firebase) {
	fireCompanies.copyToScope($scope,'companies');
	 var fireRef = new Firebase("https://hourglass-events.firebaseIO.com/");
	

	$scope.newCompany = {};

		var errId = 0;
			$('#inc').on('click', incId);
			var errId = 0;
			// creates a new, incremental record
			function incId() {
					// increment the counter
				fireRef.child('counter1').transaction(function(currentValue) {
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
					fireRef.child('companies').child(id).set({id: id, soft: 0, company: 'A New Exhibitor', created: new Date(), forecast_revenue: '5000', deposit_due: "0", amount_paid: "0", todos: { "todo1": { title: "Add Company name, and contacts"}}, contract: "0", committed: "0"}, function(err) {
					 	err && setError(err);
					 });  
					id =0;	
				});
			};	
	$scope.deleteItem = function(id){
		delete $scope.companies[id];
	};
	$scope.removeAll = function() {
		$scope.companies = {};
	};
}])
.controller("editCtrl", ['$scope', 'fireCompanies', '$stateParams', function($scope, fireCompanies, $stateParams) {
	var editCtrl = 
		$scope.id = '';
	fireCompanies.copyChildToScope($stateParams.id, $scope, 'company');

	$scope.save = function () {
	 	$scope.srcCompany = angular.copy($scope.item);
	}
}])

.controller("CompanyDetailCtrl", [ '$firebase', '$scope', '$stateParams', '$location', function($firebase, $scope, $stateParams, $location) {
		//$scope.exhibitor = Exhibitor.data;

		var exhibitorUrl = $location.path()
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/" + exhibitorUrl + "/contacts";
		 var exhibitorRef = new Firebase("https://hourglass-events.firebaseIO.com/" + exhibitorUrl);
		  var contactRef = new Firebase(fireBaseUrl);
		 $scope.exh = $firebase(exhibitorRef);

		 $scope.title = $scope.exh.company;
		
		 
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
					console.log(id);
					setTimeout(function() {

						contactRef.child(id).set({id: id, first: 'First Name', last: 'Last Name'}, function(err) {
							err && setError(err);
						});  
						
					});
				};
		};
		 
				
				// creates new incremental record
		


}])

.controller("contactController", [ '$location', '$firebase', '$scope', function($location, $firebase, $scope){

	var companyUrl = $location.path();
    var Noteref  = 'http://hourglass-events.firebaseIO.com/' + companyUrl + "/contacts";
    $scope.contacts = $firebase(new Firebase(Noteref));

    $scope.update = function(id, field, newval){
        var ref = new Firebase(Noteref + "/" + id);
        ref.child(field).set(newval);
        console.log(id);
      
    }


    $scope.addContact = function(){
      var ref = new Firebase(Noteref);
      ref.push({name: "", title: "", office: "", mobile: "", email: "", fax: ""});
    };
    $scope.removeContact = function(index){
      var ref = new Firebase(Noteref);
      ref.child(index).remove();
    };



  

}])

.controller("notesController", [ '$location', '$firebase', '$scope', function($location, $firebase, $scope){

	var companyUrl = $location.path();
    var Noteref  = 'http://hourglass-events.firebaseIO.com/' + companyUrl + "/notes";
    $scope.notes = $firebase(new Firebase(Noteref));

    $scope.update = function(id, field, newval){
        var ref = new Firebase(Noteref + "/" + id);
        ref.child(field).set(newval);
        console.log(id);
      
    }
    $scope.moveUp = function(id, pos){
        var ref = new Firebase(Noteref + "/" + id);
       var x = pos - 1;
        ref.setPriority(1);
        
    }

    $scope.moveDown = function(id, pos){
        var ref = new Firebase(Noteref + "/" + id);
        var x = pos +1;
        	ref.child('position').set(x);
        console.log(id);
      
    }


    $scope.addNote = function(){
      var ref = new Firebase(Noteref);
       ref.push({body: "", title: "", position: 1});
    };
    $scope.removeNote = function(index){
      var ref = new Firebase(Noteref);
      ref.child(index).remove();
    };



  

}]);