var app = angular.module('imdbApp',[]);

app.controller('ctrlMain', function($scope,$http){

	//Variables
	var URL = 'http://www.omdbapi.com/?s=';
	var movies = [];

	//show or hide text box
	$scope.search = false;

	//method search
	$scope.getMovies = function(query){
	query  = $scope.txtSearch;
		
	//watcher to reset results array when start a new search
	$scope.$watch('query', function(){
		if(query === ''){			
			movies = [];
		}
	});	

	//get data from IDMB API
	if(query != ''){		
		$http.get(URL + query)
		.then( function (success){
			//save all results				
			success.data.Search.forEach(function(element){			
				movies.push(element);
			});

		}, function( error ){
			console.log(error);
		 });
		}

		console.log(movies.reverse);
	return $scope.movies = movies.reverse();
	}
});