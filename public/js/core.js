// public/core.js
    var DrugsPrice = angular.module('DrugsPrice', []);
    
    function mainController($scope, $http) {
       
        $scope.formData = {};
            //Search drugs by name
        $scope.searchDrugs = function(name) {
          
       
          if(name.length > 0 ){
               $http.get('/api/selected/'+ name)
                .success(function(data) {
                    $scope.drugs = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
          }
        };
        
             //Search drug by id
        $scope.getDrugById = function(id) {
            
               $http.get('/api/drug/'+ id)
                .success(function(data) {
                    $scope.drug = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
}