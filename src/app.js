var app = angular.module('SliceDashApp', ['ngRoute', 'angularMoment', 'ngProgress', 'pusher-angular']);

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

    // route for the completed section
    .when('/list', {
        templateUrl: 'pages/waiting_list.html',
        controller: 'WaitingListCtrl'
    })

    .otherwise({
        templateUrl: 'pages/kitchen.html',
        controller: 'KitchenCtrl'
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

app.directive('capitalizeFirst', function (uppercaseFilter, $parse) {
    return {
        require: 'ngModel',
        scope: {
            ngModel: "="
        },
        link: function (scope, element, attrs, modelCtrl) {
            scope.$watch("ngModel", function () {
                scope.ngModel = scope.ngModel.replace(/^(.)|\s(.)/g, function(v){ return v.toUpperCase( ); });
            });
        }
    };
});
