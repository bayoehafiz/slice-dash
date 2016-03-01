app.controller('NavCtrl', function($scope, $rootScope, $http, auth, store, $location, blockUI) {
    $scope.signout = function() {
        blockUI.start();
        // signing out process
        auth.signout();
        store.remove('profile');
        store.remove('token');
        $location.path('/');
        // done!
        blockUI.stop();
        Materialize.toast('You are signed out', 5000);
    };
});
