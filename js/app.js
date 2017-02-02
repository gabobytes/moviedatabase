var app = angular.module('imdbApp',['infinite-scroll']);

app.controller('ctrlMain', function($scope,$http){

	//Variables
	var URL = 'http://www.omdbapi.com/?s=';	
	

	//show or hide text box
	$scope.search = false;

	//method search
	$scope.getMovies = function(query){
	query  = $scope.txtSearch;
	var movies = [];
	$scope.message = '';
		
	//get data from IDMB API
	if(query != ''){		
		$http.get(URL + query)
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
	}
});


//directive to receive enter key and make the search
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});