app.controller('LoginCtrl', function($scope, $rootScope, $http, auth, store, $location, blockUI) {
    $scope.signin = function() {
        auth.signin({}, function(profile, token) {
            // Success callback
            store.set('profile', profile);
            store.set('token', token);
            $location.path('/');
        }, function(err) {
            // Error callback
            Materialize.toast('Error logging in to your account', 5000);
            console.log(err);
        });
    }

    $scope.send = function(number) {
        // nothing here
    }
});
