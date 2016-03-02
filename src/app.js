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

    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('token');
    }

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');
})

app.run(function($rootScope, auth, store, jwtHelper, $location) {
    // This hooks al auth events to check everything as soon as the app starts
    auth.hookEvents();

    var checkAuth = function() {
        if (!auth.isAuthenticated) {
            $rootScope.signed = false;
            var token = store.get('token');
            if (token) {
                if (!jwtHelper.isTokenExpired(token)) {
                    auth.authenticate(store.get('profile'), token);
                } else {
                    $location.path('/auth');
                }
            }
        } else {
            $rootScope.signed = true;
        }
    }

    $rootScope.$on('$locationChangeStart', function() {
        checkAuth();
    });
});
