angular.module('imdbApp').controller('mainController', function($scope,$http,$routeParams,$location,getDataFactory){

	//show or hide text box
	$scope.search = false;
	
	//search
	$scope.getMovies = function(){
		var query = $scope.txtSearch;
		$scope.message = '';
		var urlTest = URL+"s="+query;
		var movies = [];
		var params = "s="+$scope.txtSearch;

	if(typeof query != "undefined"){
		getDataFactory.getObject(params)
			.then(function(response){				
				//check status				
				if(getDataFactory.getStatus(response) === 1){					
					response.data.Search.forEach(function(element){			
						movies.push(element);
					});					
				}else{
					 $scope.message = 'The Movie/Serie '+ query + ' was not found.';					 
				}				
			},function(Error){
				$scope.message = Error;
			});
		}

		$scope.movies = movies;
		$location.url("/search");		

	}


	//method show info movie on mouse over
	$scope.preview = function(id){
	 $scope.actors = '';
	 $scope.rating = '';
	 var params = "i=" + id;

	 getDataFactory.getObject(params)
	 	.then(function(response){
	 		//check status 
	 		if(getDataFactory.getStatus(response) === 1){
	 			var arrayActors = [];
	 			$scope.rating = response.data.imdbRating;
	 			arrayActors = response.data.Actors.split(',');
	 			arrayActors.pop();
	 			$scope.actors = arrayActors;
	 		}
	 	},function(Error){
	 		$scope.message = Error;
	 	});
	}



	//get individual Details
	var id = $routeParams.id;	
	var params = 'i='+id;

		getDataFactory.getObject(params)
		  .then(function(response){
		  	
		  	console.log(response.data.Title);
		  	$scope.Title = response.data.Title;
		  	$scope.Poster = response.data.Poster;
		  	var totalSeasons = response.data.totalSeasons;
		  	arraySeasons = [];
		  	for(var x= 1; x<= totalSeasons; x++){
		  		arraySeasons.push(x);		  		
		  	}
		  	$scope.seasons = arraySeasons;
		  },function(Error){
		  	$scope.message = Error;
		  });

	$scope.getEpisodes = function(season){
		var params = 'i='+id+'&season='+season;

		getDataFactory.getObject(params)
		 .then(function(response){
		 	console.log(response.data);
		 	$scope.Episodes = response.data;
		 },function(Error){
		 	$scope.message = Error;
		 });
	}

});

