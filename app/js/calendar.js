'use strict';
 
/* Google Calendar API Module */
 
angular.module('myApp.calendar', []).
    value('resp', {
        nullMethod: function() {
            return 'value';
        },
        handleClientLoad: function() {
            var apiKey = 'API_KEY';
 
            gapi.client.setApiKey(apiKey);
            window.setTimeout(this.checkAuth,1);
        },
 
        checkAuth: function() {
            var clientId = 'CLIENT_ID';
            var scopes = 'SCOPES';
 
            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, this.handleAuthResult);
        },
 
        handleAuthResult: function(authResult) {
            var authorizeButton = document.getElementById('authorize-button');
            if (authResult && !authResult.error) {
                authorizeButton.style.visibility = 'hidden';
                this.makeApiCall();
            } else {
                authorizeButton.style.visibility = '';
                authorizeButton.onclick = this.handleAuthClick;
            }
        },
 
        handleAuthClick: function(event) {
            gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, this.handleAuthResult);
            return false;
        },
 
        makeApiCall: function() {
            gapi.client.load('calendar', 'v3', function() {
                var request = gapi.client.calendar.events.list({
 
                });
                request.execute(function(resp) {
                    return resp;
                });
            });
        }        
    })


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
}]);

