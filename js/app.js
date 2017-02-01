var app = angular.module('imdbApp',[]);

app.controller('ctrlMain', function($scope,$http){

	//Variables
	var URL = 'http://www.omdbapi.com/?s=';
	var results = [];
	
	//method search
	$scope.getMovies = function(query){
	query  = $scope.txtSearch;
		
	//watcher to reset results array when start a new search
	$scope.$watch('query', function(){
		if(query === ''){			
			results = [];
		}
	});
	//http://stackoverflow.com/questions/41169385/http-get-success-is-not-a-function

	//get data from IDMB API
	if(query != ''){
		//getting data from API
		$http.get(URL + query)
		.then( function (success){
			//save all results	
			results.push(success.data.Search);
			console.log(success.data , results.length);
		}, function( error ){
			console.log(error);
		 });
		}

		//filter only movies
		movies = results.filter(function(result){
			return result.Response === 'True';
		});		

		console.log("Movies ", results);

	return $scope.movies = movies;
	}

	//method save 



});