app.controller('LoginCtrl', ['$scope', '$http', 'auth', 'store', '$location',
    function($scope, $http, auth, store, $location) {
        $scope.login = function() {
            console.log('Secure logging...');
            auth.signin({}, function(profile, token) {
                // Success callback
                store.set('profile', profile);
                store.set('token', token);
                $location.path('/');
            }, function() {
                // Error callback
            });
        }
    }
]);