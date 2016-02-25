app.directive('capitalizeFirst', function(uppercaseFilter, $parse) {
    return {
        require: 'ngModel',
        scope: {
            ngModel: "="
        },
        link: function(scope, element, attrs, modelCtrl) {
            scope.$watch("ngModel", function() {
                var input = scope.ngModel;
                scope.ngModel = input.replace(/^(.)|\s(.)/g, function(v) {
                    return v.toUpperCase();
                });
            });
        }
    };
});
