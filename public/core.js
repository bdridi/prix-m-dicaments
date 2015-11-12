// public/core.js
    var DrugsPrice = angular.module('DrugsPrice', []);

    function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
/*    $http.get('/api/drugs')
        .success(function(data) {
            $scope.drugs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
*/
    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/drugs', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.drugs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/drugs/' + id)
            .success(function(data) {
                $scope.drugs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    
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