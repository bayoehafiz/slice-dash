var app = angular.module('SliceDashApp', ['ngRoute', 'angularMoment', 'mkBlock', 'pusher-angular', 'oi.select', 'cropme', 'multi-check', 'ui.utils.masks', 'ngStorage', 'blockUI', 'ngPopup']);

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

    // route for the menu-updater section
    .when('/updater', {
        templateUrl: 'pages/menu_updater.html',
        controller: 'MenuUpdaterCtrl'
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