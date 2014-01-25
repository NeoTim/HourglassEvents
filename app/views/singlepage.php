<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>AngularJS AuthenticationService Example</title>
  <link rel="stylesheet" href="/css/normalize.css">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/style.css">
 
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  <script src="/js/libs/angular.js"></script>
  <script src="/js/libs/angular-sanitize.js"></script>
  <script src="/js/libs/bootstrap.min.js"></script>
  <script src="/js/libs/underscore.js"></script>
 
  <script src="/js/app.js"></script>
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
</head>
<body>

  <div class="row">
    <div class="col-md-12">
      <h1>End to End with Angular JS</h1>
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <div id="flash" class="alert-danger alert" ng-show="flash">
            {{ flash }}
          </div>
        </div>
      </div>
      <div id="view" ng-view></div>
    </div>
  </div>

</body>
</html>
