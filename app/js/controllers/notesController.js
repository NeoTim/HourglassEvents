
'use strict';

angular.module('myApp.notes', [])



 
.controller('notesCtrl', function($scope, $firebase){
    var Noteref  = 'http://hourglass-events.firebaseIO.com/notes/';
    $scope.links = $firebase(new Firebase(Noteref));

    $scope.update = function(id, field, newval){
        var ref = new Firebase(Noteref + "/" + id);
        ref.child(field).set(newval);
        console.log(id);
    }

    function getLinks(){
      if (!$scope.links){
        $scope.links = [];
      }
      return $scope.links;
    }
    $scope.addLink = function(){
      var ref = new Firebase(Noteref);
      ref.push({body: "", title: ""});
    };
    $scope.removeLink = function(index){
      var ref = new Firebase(Noteref);
      ref.child(index).remove();
    };

    $scope.htmlTooltip = "<input type='radio' value='#0266c8' class='btn btn-primary'>";


  });
