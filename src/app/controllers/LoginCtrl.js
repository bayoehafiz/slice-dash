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

    $scope.signout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
    }

    $scope.send = function(number) {
        blockUI.start('Processing...');
        // formatting phone number
        var firstNumber = number.charAt(0);
        if (firstNumber === '0') {
            number = number.substring(1);
        } else {
            number = number.substring(3);
        }
        // send data to server    
        $http.get('http://api.sliceapp.co:6588/admin/auth?phone=' + number).success(function(response) {
            if (response.success == true) {
                $rootScope.number = number;
                blockUI.stop();
                $location.path('/auth/2');
                Materialize.toast('Authorization code has been sent to you phone. Please check your inbox.', 5000);
            } else {
                blockUI.stop();
                $rootScope.number = null;
                Materialize.toast(response.message, 5000);
            }
        });
    };

    $scope.confirm = function(codes) {
        blockUI.start('Validating...');
        var number = $rootScope.number;
        var code = codes;
        // send data to server    
        $http.get('http://api.sliceapp.co:6588/admin/confirm?phone=' + number + '&code=' + code).success(function(response) {
            console.log(response);
            if (response.success == true) {
                // Success callback
                store.set('phone', number);
                store.set('token', response.token);
                blockUI.stop();
                $location.path('/');
            } else {
                blockUI.stop();
                Materialize.toast(response.message, 5000);
            }
        });
    };
});
