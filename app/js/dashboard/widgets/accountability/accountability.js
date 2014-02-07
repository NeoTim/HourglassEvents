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

angular.module('sample.widgets.accountability', ['adf.provider', 'firebase'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('accountability', {
        title: 'Accountability',
        description: 'Horizontal & Vertical Accountability',
        controller: 'accountabilityCtrl',
        templateUrl: 'js/dashboard/widgets/accountability/accountability.html',
        edit: {
          templateUrl: 'js/dashboard/widgets/accountability/edit.html',
          reload: false,
          controller: 'editAccountability'
        }
      });
  }).controller('accountabilityCtrl', function($scope, config, firebaseCollection, firebaseBinding, $firebase) {
    $scope.userInfo = firebaseCollection('https://open-door-test.firebaseio.com/users/user2/profile');

    var URL = 'https://open-door-test.firebaseio.com/users/user2/profile';
    var myRef = $firebase(new Firebase(URL));
    


     $scope.config = config;
    $scope.showUser = myRef;

     
  })
  
  .controller('editAccountability', function($scope, firebaseCollection, firebaseBinding, $firebase) {
  //$scope.config = firebaseCollection('https://open-door-test.firebaseio.com/users/user2/profile');
  $scope.userInfo = $scope.config;

  var URL = 'https://open-door-test.firebaseio.com/users/user2/profile/accountability/';
  var myRef = $firebase(new Firebase(URL));
  $scope.showUser = myRef;

  var userPromise = firebaseBinding('https://open-door-test.firebaseio.com/users/user2/profile/accountability', $scope, 'config' );
  userPromise.then(function(userInfo) {
      console.log($scope.showUser);
  });

  var addAccountability = function(){
    myRef.set({accountability: "cool"});
  }


});

