var app = angular.module('imdbApp',[]);

app.controller('ctrlMain', function($scope,$http){

	var URL = 'http://www.omdbapi.com/?t=';
	
	$scope.getMovies = function(query){
		query  = $scope.txtSearch;	

	//http://stackoverflow.com/questions/41169385/http-get-success-is-not-a-function

	//getting data from API
	$http.get(URL + query).success(function(data){
		console.log(data);
	});
		
	}


});