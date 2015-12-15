var ctrls = angular.module('Controllers',[]);


// Home Controller...


ctrls.controller('homeController', function($scope,$http){
	
	
	
    $scope.searchDrugs = function(name) {
         
          
          $scope.loader = true;   
          if(name.length > 2 ){
              $scope.drugs = {};
              $scope.warning_long = false;
              $scope.introuvable = false;
               $http.get('/api/selected/'+ name)
                .success(function(data) {
                    if (data.length == 0)
                        $scope.introuvable = true;
                    $scope.drugs = data;
                    $scope.loader = false;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
          }
          else {
              $scope.warning_long = true;
               $scope.introuvable = false;
               $scope.loader = false;
               $scope.drugs = {};
          }
        };

});

// Help controller
ctrls.controller('helpController', function($scope){
	$scope.message = 'ApplicationHelp Panel';
	
});


// Contact controller

ctrls.controller('contactController', function($scope,$http){

	 $scope.postData = {};

    $scope.postMail = function (contact) {
      // Check form validation
      if ($scope.contactForm.$invalid === true) {
        return
      }
      // wrap all your input values in $scope.postData
      $scope.postData = angular.copy(contact);

      $http.post('/api/contact', $scope.postData)
        .success(function(data) {
          // Show success message
        })
        .error(function(data) {
          // Show error message
        });
    };

	
	
	
	
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

