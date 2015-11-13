angular.module('Controllers',[])


/*   	Factory */

.factory('drugsFactory', function($http){
		var factory = {};	
		
		factory.getDrugs = function(name){
		        
		               
             if(name.length > 0 ){
                   $http.get('/api/selected/'+ name)
                    .success(function(data) {
                        return data;
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
              }
		
		};
			
		factory.getDrug = function(id){
		  $http.get('/api/drug/'+ id)
            .success(function(data) {
               return data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
		};	
		
		return factory;
})


// Home Controller...

.controller('homeController', function($scope,drugsFactory){
	
    $scope.searchDrugs = function(name) {
         $scope.drugs = drugsFactory.getDrugs(name);   
    };

})

.controller('helpController', function($scope){
	$scope.message = 'ApplicationHelp Panel  ';
}).


controller('detailsController',['$scope','$routeParams','drugsFactory', function($scope,$routeParams,drugsFactory){
	

	$scope.drug = drugsFactory.getDrug($routeParams.id);
	//$scope.id = $routeParams.id;

}]);

