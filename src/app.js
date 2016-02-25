var app = angular.module('SliceDashApp', ['ngRoute', 'angularMoment', 'pusher-angular', 'oi.select', 'multi-check', 'cropme', 'ui.utils.masks', 'blockUI', 'ngImgCrop']);

app.config(function($routeProvider) {
    $routeProvider
    // route for the driver section
    .when('/dispatched', {
        templateUrl: 'pages/dispatch.html',
        controller: 'DriverCtrl'
    })

    // route for the completed section
    .when('/completed', {
        templateUrl: 'pages/complete.html',
        controller: 'CompletedCtrl'
    })

    // route for the user section
    .when('/user', {
        templateUrl: 'pages/user.html',
        controller: 'UserCtrl'
    })

    // route for the waiting-list section
    .when('/list', {
        templateUrl: 'pages/waiting_list.html',
        controller: 'WaitingListCtrl'
    })

    // route for the pizza-updater section
    .when('/pizza', {
        templateUrl: 'pages/pizza_updater.html',
        controller: 'PizzaUpdaterCtrl'
    })

    // route for the extra-updater section
    .when('/extra', {
        templateUrl: 'pages/extra_updater.html',
        controller: 'ExtraUpdaterCtrl'
    })

    .otherwise({
        templateUrl: 'pages/kitchen.html',
        controller: 'KitchenCtrl'
    });
});

app.filter('capitalize', function() {
    return function(input, all) {
        var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\<W_></W_>]+[^\s-]*)/;
        return (!!input) ? input.replace(reg, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});