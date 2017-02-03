angular.module('imdbApp').config(function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix('');

	$routeProvider
		.when('/search', {
			templateUrl: 'pages/search.html',
			controller: 'mainController'
		})
		.when('/detail/:id',{
			templateUrl	: 'pages/detail.html',
			controller 	: 'detailController'
		})
		.otherwise({ redirectTo: '/' });
});