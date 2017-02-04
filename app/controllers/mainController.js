angular.module('imdbApp').controller('mainController', function($scope,$http,$routeParams,$location,getDataFactory){

	//show or hide text box
	$scope.search = false;
	
	//search
	$scope.getMovies = function(){
		var query = $scope.txtSearch;
		$scope.message = '';
		var urlTest = URL+"s="+query;
		var movies = [];
		var params = "search/tv?query="+$scope.txtSearch+"&";


	if(typeof query != "undefined"){
		  getDataFactory.getObject(params)
		  	.then(function(response){
		  	if(getDataFactory.getStatus(response) === 1){	  		
		  		response.data.results.forEach(function(element){
		  			movies.push(element);
		  		});
		  	}else{
		  		$scope.message = 'The Movie/Serie '+ query + ' was not found.';	
		  	}
		  	},function(Error){
		  		$scope.message = Error;
		  	})
		}

		$scope.movies = movies;
		$location.url("/search");		

	}


	//method show info movie on mouse over
	$scope.preview = function(id){	 
	 $scope.rating = '';
	 var params = "tv/" + id +"?"; 

	 getDataFactory.getObject(params)
	 	.then(function(response){	 		
	 		//check status 
	 		if(getDataFactory.getStatus(response) === 1){	 				 			
	 			$scope.rating = response.data.vote_average;	 			
	 		}else{
	 			$scope.message = 'The Movie/Serie '+ query + ' was not found.';	
	 		}
	 	},function(Error){
	 		$scope.message = Error;
	 	});
	}



	//get individual Details
	var id = $routeParams.id;	
	var params = "tv/" + id +"?";

	if(typeof id != 'undefined' && typeof id != 'null'){
		getDataFactory.getObject(params)
		  .then(function(response){	
		  	
		  	$scope.Title = response.data.name;
		  	$scope.Poster = response.data.poster_path;		  	

		  	var totalSeasons = response.data.number_of_seasons;
		  	arraySeasons = [];
		  	for(var x= 1; x<= totalSeasons; x++){
		  		arraySeasons.push(x);		  		
		  	}
		  	$scope.seasons = arraySeasons;
		  },function(Error){
		  	$scope.message = Error;
		  });
	}
		
	

	$scope.getEpisodes = function(season){
		var params = 'tv/'+id+'/season/'+season+'?';

		//https://api.themoviedb.org/3/tv/1418/season/1?api_key=2342d5fcd25e5d5a169bee2ed0cb1dee&language=en-US

		getDataFactory.getObject(params)
		 .then(function(response){
		 	console.log(response.data.episodes[1].air_date);
		 	
		 	response.data.episodes.forEach( function(element, index) {
		 		// statements
		 		console.log(element.name);
		 	});

		 	$scope.Episodes = response.data.episodes;
		 },function(Error){
		 	$scope.message = Error;
		 });
	}

});

