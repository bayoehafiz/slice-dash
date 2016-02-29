var app = angular.module('SliceDashApp', ['ngRoute', 'auth0', 'angular-storage', 'angular-jwt', 'angularMoment', 'pusher-angular', 'oi.select', 'multi-check', 'cropme', 'ui.utils.masks', 'blockUI', 'ngImgCrop']);

app.config(function(authProvider, $routeProvider, $locationProvider) {
    $routeProvider

    // login page route
    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'LoginCtrl'
    })

    // Logged in routes ********
    // route for the driver section
    .when('/dispatched', {
        templateUrl: 'pages/dispatch.html',
        controller: 'DriverCtrl',
        requiresLogin: true
    })

    // route for the completed section
    .when('/completed', {
        templateUrl: 'pages/complete.html',
        controller: 'CompletedCtrl',
        requiresLogin: true
    })

    // route for the user section
    .when('/user', {
        templateUrl: 'pages/user.html',
        controller: 'UserCtrl',
        requiresLogin: true
    })

    // route for the waiting-list section
    .when('/list', {
        templateUrl: 'pages/waiting_list.html',
        controller: 'WaitingListCtrl',
        requiresLogin: true
    })

    // route for the pizza-updater section
    .when('/pizza', {
        templateUrl: 'pages/pizza_updater.html',
        controller: 'PizzaUpdaterCtrl',
        requiresLogin: true
    })

    // route for the extra-updater section
    .when('/extra', {
        templateUrl: 'pages/extra_updater.html',
        controller: 'ExtraUpdaterCtrl',
        requiresLogin: true
    })

    .otherwise({
        templateUrl: 'pages/kitchen.html',
        controller: 'KitchenCtrl',
        requiresLogin: true
    });

    authProvider.init({
        domain: 'sliceapp.auth0.com',
        clientID: '0ObqRgLWig1aemBRq9S1E6aFP3wygNay',
        callbackURL: location.href,
        // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
        loginUrl: '/login'
    });

});

app.run(function(auth) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();
});
