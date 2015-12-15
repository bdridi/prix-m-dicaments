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
		
		when('/contact', {
            templateUrl: '/partials/contact.html',
            controller: 'contactController'
        }).
        
			when('/details/:id?', {
            templateUrl: '/partials/details.html',
            controller: 'detailsController'
        }).
        
			otherwise({ 
            redirectTo: '/home'
        });
    }
]);

