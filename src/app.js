var app = angular.module('SliceDashApp', ['ngRoute', 'angularMoment', 'ngProgress']);

app.config(function($routeProvider) {
    $routeProvider
    // route for the kitchen section
    .when('/', {
        templateUrl: 'pages/kitchen.html',
        controller: 'KitchenCtrl'
    })

    // route for the driver section
    .when('/dispatched', {
        templateUrl: 'pages/driver.html',
        controller: 'DriverCtrl'
    })

    // route for the completed section
    .when('/completed', {
        templateUrl: 'pages/completed.html',
        controller: 'CompletedCtrl'
    });
});

app.filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});
