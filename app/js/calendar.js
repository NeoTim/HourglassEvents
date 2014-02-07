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
    });