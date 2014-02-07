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

angular.module('sample.widgets.randommsg', ['adf.provider', 'firebase'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('randommsg', {
        title: 'Open Doors',
        description: 'Display a random quote of Douglas Adams',
        templateUrl: 'js/dashboard/widgets/randommsg/randommsg.html',
        controller: 'fireController'
      });
  })
  

.controller("clowdCtrl", function($scope, $http) {
    $http.get('js/services/jquery.json').success(function(graph) {
      $scope.root = graph;
   // $scope.currentCodeFlower = new CodeFlower("#visualization", 800, 800);
    //$scope.currentCodeFlower.go(graph);
    });
})

.controller('fireController', function($scope, config, $firebase){
    var URL = "http://open-door-test.firebaseIO.com/data/";
    var dataRef = $firebase(new Firebase(URL));

    if (!config.content){
      config.content = '';
    }
    config.content = dataRef;
    $scope.confing = config;
    

    
  })


.controller("triCtrl", function($scope, $http) {
    $scope.width = 500;
    $scope.height = 500;
    $scope.root;

    var color = d3.scale.category20()

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .gravity(.05)
        .size([$scope.width, $scope.height]);

   
    

    $http.get('js/services/miserables.json').success(function(graph) {
        $scope.nodes = graph.nodes;
        $scope.links = graph.links;

        for(var i=0; i < $scope.links.length ; i++){
            $scope.links[i].strokeWidth = Math.round(Math.sqrt($scope.links[i].value))
        }

        for(var i=0; i < $scope.nodes.length ; i++){
            $scope.nodes[i].color = color($scope.nodes[i].group)
        }

        force
            .nodes($scope.nodes)
            .links($scope.links)
            .on("tick", function(){$scope.$apply()})
           
            .start();

    })
    

    

})


.controller("tricontroller", function($scope, $http) {
 $scope.width = 960,
      $scope.height = 500,
    $scope.root;

var force = d3.layout.force()
    .linkDistance(80)
    .charge(-120)
    .gravity(.05)
    .size([$scope.width, $scope.height])
    .on("tick", tick);

 var svg = d3.select("body").append("svg")
    .attr("width", $scope.width)
    .attr("height", $scope.height);

 $scope.link = svg.selectAll(".link"),
    $scope.node = svg.selectAll(".node");

d3.json("js/services/more.json", function(error, json) {
  $scope.root = json;
  update();
});

function update() {
   $scope.nodes = flatten($scope.root),
    $scope.links = d3.layout.tree().links($scope.nodes);

  // Restart the force layout.
  force
      .nodes($scope.nodes)
      .links($scope.links)
      .start();

  // Update links.
  $scope.link = $scope.link.data($scope.links, function(d) { return d.target.id; });

  $scope.link.exit().remove();

  $scope.link.enter().insert("line", ".node")
      .attr("class", "link");

  // Update nodes.
  $scope.node = $scope.node.data($scope.nodes, function(d) { return d.id; });

  $scope.node.exit().remove();

  var nodeEnter = $scope.node.enter().append("g")
      .attr("class", "node")
      .on("click", click)
      .call(force.drag);

  nodeEnter.append("circle")
      .attr("r", function(d) { return Math.sqrt(d.size) / 10 || 4.5; });

  nodeEnter.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.name; });

  $scope.node.select("circle")
      .style("fill", color);
}

function tick() {
  $scope.link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  $scope.node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function color(d) {
  return d._children ? "#3182bd" // collapsed package
      : d.children ? "#c6dbef" // expanded package
      : "#fd8d3c"; // leaf node
}

// Toggle children on click.
function click(d) {
  if (d3.event.defaultPrevented) return; // ignore drag
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update();
}

// Returns a list of all nodes under the root.
function flatten(root) {
  $scope.nodes = [];
  var i = 0;

  function recurse(node) {
    if ($scope.node.children) $scope.node.children.forEach(recurse);
    if (!$scope.node.id) $scope.node.id = ++i;
    $scope.nodes.push($scope.node);
  }

  recurse($scope.root);
  return $scope.nodes;
}
    

    

});

