var app = angular.module('SliceDashApp', ['ngRoute', 'auth0', 'angular-storage', 'angular-jwt', 'angularMoment', 'pusher-angular', 'oi.select', 'multi-check', 'cropme', 'ui.utils.masks', 'blockUI', 'ngImgCrop']);

app.config(function(authProvider, $routeProvider, $locationProvider, $httpProvider, jwtInterceptorProvider) {
    $routeProvider

    // login page route
        .when('/auth', {
        templateUrl: 'pages/login.html',
        controller: 'LoginCtrl'
    })

    // Logged in routes ********

    // route for the driver section
    .when('/kitchen', {
        templateUrl: 'pages/kitchen.html',
        controller: 'KitchenCtrl',
        requiresLogin: true
    })

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
        redirectTo: '/kitchen'
    });

    authProvider.init({
        domain: 'sliceapp.auth0.com',
        clientID: 'FEtEC6pUnsYFTzTqvcJDYwtj3h54dm6M',
        callbackURL: location.href,
        // Here include the URL to redirect to if the user tries to access a resource when not authenticated.
        loginUrl: '/auth'
    });

    // We're annotating this function so that the `store` is injected correctly when this file is minified
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        // Return the saved token
        return store.get('token');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
});

app.run(function($rootScope, auth, store, jwtHelper, $location) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();

    // This events gets triggered on refresh or URL change
    $rootScope.$on('$locationChangeStart', function() {
        var token = store.get('token');
        if (token) {
            console.log('Got the token!');
            if (!jwtHelper.isTokenExpired(token)) {
                if (!auth.isAuthenticated) {
                    auth.authenticate(store.get('profile'), token);
                }
            } else {
                // Either show the login page or use the refresh token to get a new idToken
                $location.path('/');
            }
        }
    });
});
