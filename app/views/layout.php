<!doctype html>
<html lang="en" ng-app="app">
	<head>
		<meta charset="utf-8">
		<title>CoatingsCom | Dashboard</title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
		<meta content="" name="description"/>
		<meta content="" name="author"/>
		<meta name="MobileOptimized" content="320">


		<link href="assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
		<link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
		<link href="assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
		<!-- END CORE STYLES -->
		<!-- BEGIN GLOBAL STYLES -->
		<link rel="stylesheet" href="assets/plugins/data-tables/DT_bootstrap.css"/>
		<link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.css"/>
		<link rel="stylesheet" type="text/css" href="assets/plugins/gritter/css/jquery.gritter.css"/>
		<link rel="stylesheet" type="text/css" href="assets/plugins/select2/select2_metro.css"/>
		
		<link rel="stylesheet" href="/css/normalize.css">
		
		<link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-datepicker/css/datepicker.css"/>
		<link rel="stylesheet" type="text/css" href="assets/plugins/bootstrap-datetimepicker/css/datetimepicker.css"/>
		<link rel="stylesheet" type="text/css" href="assets/plugins/jquery-multi-select/css/multi-select.css"/>
		<link href="assets/css/pages/pricing-tables.css" rel="stylesheet" type="text/css"/>



  		<link href="assets/css/style-metronic.css" rel="stylesheet" type="text/css"/>
		<link href="assets/css/style.css" rel="stylesheet" type="text/css"/>
		
		<link href="assets/css/plugins.css" rel="stylesheet" type="text/css"/>
		<link href="assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>

		<link href="css/bootstrap-switch.css" rel="stylesheet" type="text/css" id="style_color"/>
		<link href="css/jquery.sidr.dark.css" rel="stylesheet" type="text/css" id="style_color"/>
		<link href="css/docs.css" rel="stylesheet" type="text/css" id="style_color"/>
		<link href="css/style.css" rel="stylesheet" type="text/css" id="style_color"/>
		<link href="js/trackcom/boot-select/bootstrap-select.css" rel="stylesheet" type="text/css" id="style_color"/>
	  	
		<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
		<script src="/js/libs/angular.js"></script>
		<script src="/js/libs/angular-sanitize.js"></script>
		<script src="/js/libs/bootstrap.min.js"></script>
		<script src="/js/libs/underscore.js"></script>

		<script src="/js/app.js"></script>
		<script>
		angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
		</script>

		<!-- @yield('head') -->

	</head>
	<body class="page-header-fixed page-sidebar-fixed">

		<!-- HEADER -->
		<div id="mainnav" class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>

					<a class="navbar-toggle" id="sidebar-left-toggle" href="#sidebar-left">
						<i class="fa fa-cogs"></i>
					</a>

					<a class="navbar-brand" href="#/dashboard">Track<strong>Com</strong></a>
					
				</div>
				<div class="navbar-collapse collapse" style="height: 1px;">
					
					<ul class="nav navbar-nav navbar-right visible-xs">
						<li>
							<img src="" class="user-avatar"> 
							<a href=""></a>
						</li>
					</ul>
					<ul class="nav navbar-nav navbar-right hidden-xs">
						<li class="dropdown">
							<a href="" class="dropdown-toggle" data-toggle="dropdown">
								<!-- <img src="" class="user-avatar">  -->
								JoelCox <b class="caret"></b>
							</a>
							<ul class="dropdown-menu">
								<li class="dropdown-header">Admin</li>
								<li><a href="" data-toggle="modal" data-target="#notify_modal">Notify</a></li>
								<li><a href="#/dashboard">Dashboard</a></li>
								<li><a href="#/calendars">Calendar</a></li>
								<li><a href="#/documents">Documents</a></li>
								
								<li><a href="#/database">Database</a></li>
								
								<li class="divider"></li>
								<li><a href="#">Sign out</a></li>
							</ul>
						</li>
					</ul>


					<!-- <form class="navbar-form navbar-right form-search hidden-sm hidden-xs" role="search">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Search">
						</div>
						<button type="submit" class="btn btn-default"><i class="fa fa-search"></i> </button>
					</form> -->
				</div><!--/.nav-collapse -->
			</div><!--/.container -->
		</div>
		<!-- Button trigger modal -->


		<div class="clearfix"></div>

		<div class="page-container">
			<aside id="sidebar-left" class="section menu" style="height: 3543px;">
				<ul class="nav list-unstyled">
					<li class=" active ">
						<a href="#/dashboard">
							<i class="fa fa-dashboard"></i>
							<span>Dashboard</span>
						</a>
					</li>
					<li class=" ">
						<a href="#/users">
							<i class="fa fa-user"></i>
							<span>Users</span>
						</a>
					</li>
					<li class="  ">
						<a href="#/calendars">
							<i class="fa fa-calendar"></i>
							<span>Calendar</span>
						</a>
					</li>
					<li class=" ">
						<a href="#/production">
							<i class="fa fa-bar-chart-o"></i>
							<span>Production</span>
						</a>
					</li>
					<li class=" ">
						<a href="#/orders">
							<i class="fa fa-clipboard"></i>
							<span>Orders</span>
						</a>
					</li>
					<li class=" ">
						<a href="#/customers">
							<i class="fa fa-group"></i>
							<span>Customers</span>
						</a>
					</li>
					<li class="  ">
						<a href="#/products">
							<i class="fa fa-tags"></i>
							<span>Products</span>
						</a>
					</li>
					<li class="">
						<a href="#/documents">
							<i class="fa fa-file"></i>
							<span>Documents</span>
						</a>
					</li>
					<li class=" ">
						<a href="#/activities">
							<i class="fa fa-tasks"></i>
							<span>Activity</span>
						</a>
					</li>
					<li class=" ">
						<a href="notify">
							<i class="fa fa-bullhorn"></i>
							<span>Notify</span>
						</a>
					</li>

				</ul>
			</aside>
			<!-- SIDEBAR -->
			<div id="flash" class="alert-danger alert" ng-show="flash">
		            {{ flash }}
		          </div>
			<div class="page-content-wrapper">
				<div class="page-content">

				<div class="row">

					<div class="col-md-12">

						<div class="shortcut-group section-content">
					
							<ul class="quick-menu list-unstyled">
								<li class="blue primary">
									<a href="">
										<i class="fa fa-tachometer"></i>
										<span>Dashboard</span>
									</a>
								</li>
								<li class="yellow warning">
									<a href="#/production">
										<i class="fa fa-bar-chart-o"></i>
										<span>Production</span>
									</a>
								</li>
								<li class="green success">
									<a href="#/orders">
										<i class="fa fa-clipboard"></i>
										<span>Orders</span>
									</a>
								</li>
								<li class="inverse">
									<a href="">
										<i class="fa fa-group"></i>
										<span>Customers</span>
									</a>
								</li>
								<li class="red danger">
									<a href="">
										<i class="fa fa-calendar"></i>
										<span>Calendar</span>
									</a>
								</li>
								<li class="lite-blue info">
									<a href="">
										<i class="fa fa-truck"></i>
										<span>Deliveries</span>
									</a>
								</li>
							</ul>
							
							<span class="align-center">
								
								<br />
								<h1>{{ title }}</h1>
							</span>
							<hr>
						</div>

					</div>

				</div>
				<div class="clearfix"></div>

				<!-- BEGIN CONTENT WRAP -->
				<div class="row">
					<div id="view" ng-view class='col-md-12'></div>
				</div>
				<!-- END CONTENT WRAP -->

			</div>
		</div>



	</div>
	<script src="assets/plugins/jquery-1.10.2.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
	<script src="js/trackcom/jquery-ui.min.js" type="text/javascript"></script>
	<script src="assets/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
	<script src="js/trackcom/jquery.equalheights.min.js" type="text/javascript"></script>
	<script src="js/trackcom/bootstrap-switch.js" type="text/javascript"></script>
	<script src="js/trackcom/boot-select/bootstrap-select.min.js" type="text/javascript"></script>
	<script src="js/trackcom/bootstrap-filestyle.js" type="text/javascript"></script>
	<script src="js/trackcom/jquery.sidr.min.js" type="text/javascript"></script>


	<script src="assets/plugins/bootstrap-hover-dropdown/twitter-bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery.blockui.min.js" type="text/javascript"></script>
	<script src="assets/plugins/jquery.cokie.min.js" type="text/javascript"></script>
	<script src="assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
	<!-- END CORE PLUGINS -->

	<!-- BEGIN GLOBAL PLUGINS -->
	<script type="text/javascript" src="assets/plugins/select2/select2.min.js"></script>
	<script type="text/javascript" src="assets/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>
	<script type="text/javascript" src="assets/plugins/jquery-multi-select/js/jquery.quicksearch.js"></script>
	<script type="text/javascript" src="assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"></script>
	<script type="text/javascript" src="assets/plugins/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
	<script type="text/javascript" src="assets/plugins/data-tables/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="assets/plugins/data-tables/DT_bootstrap.js"></script>
	<!-- END CORE PLUGINS -->

	<!-- BEGIN PAGE PLUGINS -->


	<!-- @yield('page_plugins') -->


	<!-- END PAGE PLUGINS -->
	<!-- The XDomainRequest Transport is included for cross-domain file deletion for IE 8 and IE 9 -->
	<!--[if (gte IE 8)&(lt IE 10)]>
	<script src="assets/plugins/jquery-file-upload/js/cors/jquery.xdr-transport.js"></script>
	<![endif]-->
	<!-- BEGIN GLOBAL SCRIPTS -->
	
	<script type="text/javascript" src="assets/plugins/gritter/js/jquery.gritter.js"></script>
	<!-- <script src="node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js"></script>-->
	<script src="assets/scripts/app.js"></script>
	<script src="assets/scripts/table-advanced.js"></script>
	<script src="assets/scripts/form-components.js"></script>
	<script src="js/trackcom/script.js" type="text/javascript"></script>

<!-- 		@yield('body')		 -->

<!-- 		@yield('footer') -->
		
<!-- 		@yield('scripts') -->

	</body>
</html>
