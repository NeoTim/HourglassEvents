'use strict';

angular.module('myApp.companies', ['firebase', 'ui.router'])

.controller('companiesCtrl', function($scope, syncData){
		$scope.companies = syncData('companies');
})


.controller("companyDetail", [ '$firebase', '$scope', '$stateParams', '$location', function($firebase, $scope, $stateParams, $location) {
		//$scope.exhibitor = Exhibitor.data;

		var exhibitorUrl = $location.path()
		var fireBaseUrl = "https://hourglass-events.firebaseio.com/" + exhibitorUrl + "/contacts";
		var exhibitorRef = new Firebase("https://hourglass-events.firebaseIO.com/" + exhibitorUrl);
		
		  var contactRef = new Firebase(fireBaseUrl);
		 $scope.exh = $firebase(exhibitorRef);

		 $scope.title = $scope.exh.company;

		$scope.updateCompany = function(id, newval){
			exhibitorRef.child('company').set(newval);
		}
		 
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
		 

		 $scope.removeCompany = function(id){
		 	exhibitorRef.remove();
		 	$location.path("/dashboard");
		 }
				
				// creates new incremental record
		


}])

.controller("companyContacts", [ '$location', '$firebase', '$scope', function($location, $firebase, $scope){

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

.controller("companyNotes", [ '$location', '$firebase', '$scope', function($location, $firebase, $scope, syncData){

	var companyUrl = $location.path();
    var Noteref  = 'http://hourglass-events.firebaseIO.com/' + companyUrl + "/notes";
    $scope.notes = $firebase(new Firebase(Noteref));

    $scope.update = function(id, field, newval){
        var ref = new Firebase(Noteref + "/" + id);
        ref.child(field).set(newval);
        ref.child('date').set(Firebase.ServerValue.TIMESTAMP)
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
       ref.push({body: "Notes", title: "Title", position: 1, date: Firebase.ServerValue.TIMESTAMP});
       
    };
    $scope.removeNote = function(index){
      var ref = new Firebase(Noteref);
      ref.child(index).remove();
    };



  

}]);
