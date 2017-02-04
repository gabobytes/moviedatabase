angular.module('imdbApp').factory('getDataFactory', function($http){	
		var apiKey = '2342d5fcd25e5d5a169bee2ed0cb1dee';
		var urlBase = 'https://api.themoviedb.org/3/';
		var API = {};		 


		API.getObject = function(params){			
			console.log(urlBase+params+'api_key='+apiKey);
			return $http.get(urlBase+params+'api_key='+apiKey);
		}

		API.getStatus = function(object){
			if(object.status >= 200 && object.status <= 299){
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
		return API;			
});