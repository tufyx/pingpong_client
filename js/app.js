	var app = angular.module('pingpPongApp', ['ngRoute','ui.bootstrap']);
	
	// Configure route provider
	app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	  	.when("/players",{templateUrl:"partials/players.html", controller:"PlayersController", controllerAs:"playersCtrl"})
	  	.when("/fixtures",{templateUrl:"partials/fixtures.html", controller:"FixturesController", controllerAs:"fixturesCtrl"})
	  	.when("/results",{templateUrl:"partials/results.html", controller:"ResultsController", controllerAs:"resultsCtrl"})
	  	.when("/user/view/:userID",{templateUrl:"partials/userprofile.html", controller:"UserProfileController", controllerAs:"userProfileCtrl"})
	  	.when("/regulations",{templateUrl:"partials/regulations.html"})
	  	.when("/rules",{templateUrl:"partials/rules.html"})
		.otherwise({redirectTo: '/index.html'});
	}]);
	
  // Directives
  
  app.directive('mainNavigation', function(){
	  return{
			 restrict:'E',
			 templateUrl:'views/main_navigation.html',
			 controller:'MainNavigationController',
			 controllerAs:'main'
		  };
  });
  
  app.directive('roundElement', function(){
	  return{
			 restrict:'E',
			 scope:{
				 round: '='
			 },
			 templateUrl:'partials/round.html',
			 controller:'RoundController',
			 controllerAs:'roundCtrl'
		  };
  });