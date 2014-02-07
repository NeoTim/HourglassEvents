/*
 * The MIT License
 *
 * Copyright (c) 2013, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
'use strict';

angular.module('sample', [
  'adf', 'sample.widgets.news',
  'sample.widgets.weather',
  'sample.widgets.linklist', 'LocalStorageModule', 'ng-firebase', 'firebase'
])
.value('prefix', '')
.config(function (dashboardProvider) {
  dashboardProvider
    .structure('6-6', {
      rows: [{
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }]
    })
    .structure('4-8', {
      rows: [{
        columns: [{
          class: 'col-md-4',
          widgets: []
        }, {
          class: 'col-md-8',
          widgets: []
        }]
      }]
    })
    .structure('12/4-4-4', {
      rows: [{
        columns: [{
          class: 'col-md-12'
        }]
      }, {
        columns: [{
          class: 'col-md-4'
        }, {
          class: 'col-md-4'
        }, {
          class: 'col-md-4'
        }]
      }]
    })
    .structure('12/6-6/12', {
      rows: [{
        columns: [{
          class: 'col-md-12'
        }]
      }, {
        columns: [{
          class: 'col-md-6'
        }, {
          class: 'col-md-6'
        }]
      }, {
        columns: [{
          class: 'col-md-12'
        }]
      }]
    })
   .structure('4-8/4-4-4-4', {
      rows: [{
        columns: [{
          class: 'col-md-3'

        },{
          class : 'col-md-9'
        }]
      }, {
        columns: [{
          class: 'col-md-3',
          widgets : []
        }, {
          class: 'col-md-3'
        }, {
          class: 'col-md-3'
        }, {
          class: 'col-md-3'
        }]
      }]
    })

})
.controller('dashboardCtrl', function ($scope, localStorageService) {
  var name = 'default';
  var model = localStorageService.get(name);
  if (!model) {
    // set default model for demo purposes
    model = {
      title: "Dashboard",
      structure: "4-8",
      rows: [{
        columns: [{
          class: "col-md-4",
          widgets: [{
            type: "linklist",
            config: {
              links: [{
                title: "SCM-Manager",
                href: "http://www.scm-manager.org"
              }, {
                title: "Github",
                href: "https://github.com"
              }, {
                title: "Bitbucket",
                href: "https://bitbucket.org"
              }, {
                title: "Stackoverflow",
                href: "http://stackoverflow.com"
              }]
            },
            title: "Links"
          }, {
            type: "weather",
            config: {
              location: "Hildesheim"
            },
            title: "Weather Hildesheim"
          }, {
            type: "weather",
            config: {
              location: "Edinburgh"
            },
            title: "Weather"
          }, {
            type: "weather",
            config: {
              location: "Dublin,IE"
            },
            title: "Weather"
          }]
        }, {
          class: "col-md-8",
          widgets: [{
            type: "randommsg",
            config: {},
            title: "Douglas Adams"
          }, {
            type: "markdown",
            config: {
              content: "![scm-manager logo](https://bitbucket.org/sdorra/scm-manager/wiki/resources/scm-manager_logo.jpg)\n\nThe easiest way to share and manage your Git, Mercurial and Subversion repositories over http.\n\n* Very easy installation\n* No need to hack configuration files, SCM-Manager is completely configureable from its Web-Interface\n* No Apache and no database installation is required\n* Central user, group and permission management\n* Out of the box support for Git, Mercurial and Subversion\n* Full RESTFul Web Service API (JSON and XML)\n* Rich User Interface\n* Simple Plugin API\n* Useful plugins available ( f.e. Ldap-, ActiveDirectory-, PAM-Authentication)\n* Licensed under the BSD-License"
            },
            title: "Markdown"
          }]
        }]
      }]      
    };
  }
  $scope.name = name;
  $scope.model = model;

  $scope.$on('adfDashboardChanged', function (event, name, model) {
    localStorageService.set(name, model);
  });
})

/*
.run(['loginService', '$rootScope', 'FBURL', function(loginService, $rootScope, FBURL) {
       if( FBURL === 'https://INSTANCE.firebaseio.com' ) {
          // double-check that the app has been configured
          angular.element(document.body).html('<h1>Please configure app/js/config.js before running!</h1>');
          setTimeout(function() {
             angular.element(document.body).removeClass('hide');
          }, 250);
       }
       else {
          // establish authentication
          $rootScope.auth = loginService.init('/login');
          $rootScope.FBURL = FBURL;


      }
    }]);

angular.module('myApp',
      ['ui.sortable', 'ui.router', 'angular-flip', 'mgcrea.ngStrap','ui.calendar', 'myApp.config', 'myApp.routes', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers',
         'waitForAuth', 'routeSecurity']
   )


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
  
}]);*/