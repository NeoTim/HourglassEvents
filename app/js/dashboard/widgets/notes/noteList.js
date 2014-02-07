/* *
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
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

angular.module('sample.widgets.noteList', ['adf.provider', 'ng-firebase'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('noteList', {
        title: 'My Notes',
        description: 'Displays a list of links',
        controller: 'noteListCtrl',
        templateUrl: 'js/dashboard/widgets/notes/noteList.html',
        edit: {
          templateUrl: 'js/dashboard/widgets/notes/edit.html',
          reload: true,
          controller: 'noteListEditCtrl'
        }
      });
  }).controller('noteListCtrl', function($scope, config){
    if (!config.links){
      config.links = [];
    }
    $scope.links = config.links;
  }).controller('noteListEditCtrl', function($scope){
    function getLinks(){
      if (!$scope.config.links){
        $scope.config.links = [];
      }
      return $scope.config.links;
    }
    $scope.addLink = function(){
      getLinks().push({});
    };
    $scope.removeLink = function(index){
      getLinks().splice(index, 1);
    };
  });
