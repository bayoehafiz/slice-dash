var app = angular.module('SliceDashApp', ['ngRoute', 'angularMoment', 'mkBlock', 'pusher-angular', 'oi.select', 'cropme', 'multi-check', 'ui.utils.masks', 'ngStorage']);

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

app.directive('capitalizeFirst', function(uppercaseFilter, $parse) {
    return {
        require: 'ngModel',
        scope: {
            ngModel: "="
        },
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch("ngModel", function() {
                scope.ngModel = scope.ngModel.replace(/^(.)|\s(.)/g, function(v) {
                    return v.toUpperCase();
                });
            });
        }
    };
});

app.directive('mediaPreview', mediaPreview);

mediaPreview.$inject = ['$log'];

function mediaPreview($log) {

    var directive = {
        restrict: 'A',
        require: 'ngModel',
        link: link
    }

    return directive;

    function link(scope, element, attrs, ngModel) {

        // return if isn't input
        if (element[0].nodeName.toLowerCase() !== 'input') {
            $log.warn('mediaPreview:', 'The element is not a input node! ', element);
            return;
        }

        // return if isn't type file
        if (attrs.type != 'file') {
            $log.warn('mediaPreview:', 'Input type is not file on following element! ', element);
            return;
        }

        // set restricted accept types
        if (!element.attr('accept') || element.attr('accept') != 'image/*,video/*') element.attr('accept', 'image/*,video/*');;

        // create id for preview(s) container
        var id = attrs.ngModel + '-preview';

        // create file reader
        var reader = new FileReader();

        // create container if not exist
        if (!document.getElementById(id)) {
            var div = document.createElement('div');
            div.id = id;
            element[0].parentNode.insertBefore(div, element[0]);
        }

        // create element preview defaults
        function createPreview(type, src) {
            var el = document.createElement(type);
            el.style.margin = '2%';
            el.style.width = '25%';
            el.style.height = 'auto';
            el.style.boxShadow = '0 0 0 4px white, 0px 1px 7px 4px rgba(0, 0, 0, 0.15), 0px 0px';
            el.src = src;
            return el;
        }

        // check for child nodes
        function hasNodes(element) {
            return (element.childNodes.length);
        }


        // during change event
        element.on('change', function(e) {

            // get element if present
            var container = document.getElementById(id);
            // reset item count
            var count = 0;
            // get files
            var files = element[0].files;
            // set model view value
            attrs.multiple ? ngModel.$setViewValue(files) : ngModel.$setViewValue(files[0]);

            reader.onload = function(e) {

                scope.$apply(function() {
                    // store result
                    var result = e.target.result;

                    // is a image type
                    if (result.indexOf('data:image') > -1) {
                        container.appendChild(createPreview('img', result));
                    }

                    // is a video type
                    if (result.indexOf('data:video') > -1) {
                        var video = createPreview('video', result);
                        video.setAttribute('controls', true);
                        container.appendChild(video);
                    }

                })

            }

            reader.onloadend = function() {
                scope.$apply(function() {
                    if (count < (files.length - 1)) {
                        // increase count
                        count++;
                        // read next file
                        return reader.readAsDataURL(files[count]);
                    }
                })
            }


            // check if there are files to read
            if (files && files.length) {

                // reset container
                container.innerHTML = '';

                // read element data url
                return reader.readAsDataURL(files[count]);
            }

            return container.innerHTML = '';

        })

    }

};
