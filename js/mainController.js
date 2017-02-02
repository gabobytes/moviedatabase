angular.module('imdbApp').controller('mainController', function($scope,$http,$location){

	//Variables
	var URL = 'http://www.omdbapi.com/?';	
	//show or hide text box
	$scope.search = false;

	//method search
	$scope.getMovies = function(query){
	query  = $scope.txtSearch;
	var movies = [];
	$scope.message = '';
		
	//get data from IDMB API
	if(query != ''){		
		$http.get(URL + "s=" +query)
		.then( function (success){
				
			//get status of search
			status = success.data.Response;

				if(status ==='True'){
					//save all results						
					success.data.Search.forEach(function(element){			
					movies.push(element);
					});
				}else{
				  $scope.message = 'The Movie/Serie '+ query + ' was not found.';
				}					

		}, function( Error ){
			$scope.message = Error;
		 });
		}

		//sending all the array of movies found
		$scope.movies = movies;
		$location.url("/search");
	}


	//method show info movie on mouse over
	$scope.preview = function(id){
	 $scope.actors = '';
	 $scope.rating = '';

		$http.get(URL + "i=" + id)
		.then( function(success) {

			status = success.data.Response;
			
			if(status === 'True'){
				$scope.rating = success.data.imdbRating;			

			}
		},function(Error){
			$scope.message = Error;
		});
	}

	//method show details

});