var ctrls = angular.module('Controllers',[]);


/*   	Factory */

/*
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
}).
*/

// Home Controller...


ctrls.controller('homeController', function($scope,$http){
	
    $scope.searchDrugs = function(name) {
          
       
          if(name.length > 3 ){
              $scope.drugs = {};
              $scope.warning_long = false;
              $scope.introuvable = false;
               $http.get('/api/selected/'+ name)
                .success(function(data) {
                    if (data.length == 0)
                        $scope.introuvable = true;
                    $scope.drugs = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
          }
          else {
              $scope.warning_long = true;
               $scope.drugs = {};
          }
        };

});

ctrls.controller('helpController', function($scope){
	$scope.message = 'ApplicationHelp Panel';
	
});


// details controller
ctrls.controller('detailsController',['$scope','$routeParams','$http', function($scope,$routeParams,$http){
	

	$scope.id = $routeParams.id;

            
     $http.get('/api/drug/'+$routeParams.id)
            .success(function(data) {
                    $scope.drug = data;
                    console.log(data);
                })
                .error(function(data) {
                console.log('Error: ' + data);
              });
     
}]);

