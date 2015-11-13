var app = angular.module("DrugsPrice",['ngRoute','Controllers']);

app.config(['$routeProvider',
    function($routeProvider) { 
        
        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: '/partials/home.html',
            controller: 'homeController'
        }).
        when('/help', {
            templateUrl: '/partials/help.html',
            controller: 'helpController'
        }).
					
				when('/partials/details/:id?', {
            templateUrl: 'details.html',
            controller: 'detailsController'
        }).
        
			otherwise({ 
            redirectTo: '/home'
        });
    }
]);

