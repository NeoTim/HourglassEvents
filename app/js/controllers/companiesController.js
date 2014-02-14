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
		
            //exhibitorRef.child('page').set({Contacts: true, Packages: true, MTS: true, Notes: true, Todos: true, Partner: true});

		  var contactRef = new Firebase(fireBaseUrl);
		 $scope.exh = $firebase(exhibitorRef);

		 $scope.title = $scope.exh.company;
		$scope.levels = [
		    {name:'Exhibitor', plevel:'null'},
		    {name:'Bronze', plevel:'bronze'},
		    {name:'Silver', plevel:'silver'},
		    {name:'Gold', plevel:'gold'},
		    {name:'Platinum', plevel:'platinum'}
		  ];
		  
		$scope.updateCompany = function(id, newval){
			exhibitorRef.child('company').set(newval);
		}

		$scope.updatePlevel = function(id, newval){
			exhibitorRef.child('plevel').set(newval);
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
		
            $scope.removePage = function(page){
                  exhibitorRef.child('page').child(page).set(false);
            }

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



  

}])

.controller("companyAds", [ '$location', '$firebase', '$scope', function($location, $firebase, $scope, syncData){

	var companyUrl = $location.path();
    var adsRef  = 'http://hourglass-events.firebaseIO.com/' + companyUrl + "/ads";
    $scope.ads = $firebase(new Firebase(adsRef));

      $scope.update = function(id, field, newval){
          var ref = new Firebase(adsRef + "/" + id);
          ref.child(field).set(newval);
          console.log(id);
        
      }


      $scope.updateAdDate = function(id, newval){
          var ref = new Firebase(adsRef + "/" + id);
          var dueDate = [];
          if(newval == "March/April"){
              dueDate = "Feb 10"
          } else if(newval == "May/June") {
              dueDate = "Apr 10"
          } else if(newval == "July/Aug") {
              dueDate = "June 10"
          } else if(newval == "Sept/Oct") {
              dueDate = "Aug 10"
          } else if(newval == "Nov/Dec") {
              dueDate = "Oct 10"
          }

          ref.child('adDate').set(newval);
          ref.child('dueDate').set(dueDate);
          console.log(ref);
        
      }

      $scope.updateStatus = function(id, newval){
            var color = [];
            var ref = new Firebase(adsRef);
            if(newval == 'reminded'){
                  color = 'warning';
            } else if(newval == 'received'){
                  color = 'success';
            } else if(newval == 'sent'){
                  color = 'info'
            }
            ref.child(id).child('status').set(newval);
            ref.child(id).child('color').set(color);
      }

      $scope.addAds = function(){
        var ref = new Firebase(adsRef);
         ref.push({body: " "});
         
      };
      $scope.removeAds = function(index){
        var ref = new Firebase(adsRef);
        ref.child(index).remove();
      };



  

}])
.controller("companyPackage", [ '$location', '$firebase', '$scope', function($location, $firebase, $scope, syncData){

	var companyUrl = $location.path();
    var packageRef  = 'http://hourglass-events.firebaseIO.com/' + companyUrl + "/package";
    $scope.package = $firebase(new Firebase(packageRef));

    $scope.update = function(id, field, newval){
        var ref = new Firebase(packageRef + "/" + id);
        ref.child(field).set(newval);
        console.log(id);
      
    }
    $scope.moveUp = function(id, pos){
        var ref = new Firebase(packageRef + "/" + id);
       var x = pos - 1;
        ref.setPriority(1);
        
    }

    $scope.moveDown = function(id, pos){
        var ref = new Firebase(packageRef + "/" + id);
        var x = pos +1;
        	ref.child('position').set(x);
        console.log(id);
      
    }


    $scope.addItem = function(){
      var ref = new Firebase(packageRef);
       ref.push({body: "Details", title: "Title", price: "price"});
       
    };
    $scope.removeItem = function(index){
      var ref = new Firebase(packageRef);
      ref.child(index).remove();
    };



  

}]);

var ModalDemoCtrl = function ($scope, $modal, $log, $firebase, $location) {

  var fb = new Firebase("http://hourglass-events.firebaseIO.com/" + $location.path());

  $scope.items = ['Contacts', 'Packages', 'MTS', 'Notes', 'Todos', 'Partner'];

  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      fb.child('page').child(selectedItem).set(true);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
};
