//https://weblogs.asp.net/dwahlin/using-an-angularjs-factory-to-interact-with-a-restful-service
angular.module('imdbApp').factory('getDataFactory', function($http){	
		var urlBase = 'http://www.omdbapi.com/?';
		var API = {};

		API.getObject = function(params){
			return $http.get(urlBase+params);
		}

		API.getStatus = function(object){
			if(object.data.Response === 'True'){
				return 1;
			}else {
				return 0;
			}
		}

		API.getTitles = function(object){
			var titles = [];
			object.data.Search.forEach(function(element){			
				titles.push(element);
			});
			return titles;
		}

		//getActors with id
		API.getActors = function(id){

		}


		return API;			
});