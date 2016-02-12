app.controller('UserCtrl', function($window, $scope, $rootScope, $pusher, UserService, mkBlocker, $route, $localStorage, blockUI) {
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').text('USER MANAGER');

    UserService
        .getAllUsers('name')
        .success(function(data) {

            var countVerified = function(object) {
                var verified = 0
                unverified = 0;
                // count verified and un-verified users
                angular.forEach(object, function(user) {
                    if (user.status == true) {
                        verified++;
                    } else {
                        unverified++;
                    }
                });

                $scope.verNum = verified;
                $scope.unverNUm = unverified;
            }

            if (data.message == 'No record yet.') {
                $rootScope.allUsers = [];
            } else {
                countVerified(data);
                $rootScope.allUsers = data;
            };

            // Sort user list
            $scope.sorting = function(param) {
                blockUI.start();

                UserService.getAllUsers(param).success(function(result) {
                    $rootScope.allUsers = result;

                    blockUI.stop();
                })
            };

            // Delete user
            $scope.delete = function(uid) {
                blockUI.start();

                UserService.deleteUser(uid).success(function(response) {
                    var status = response.success;
                    if (status == true) {
                        UserService.getAllUsers('name').success(function(response) {
                            countVerified(response);
                            $rootScope.allUsers = response;
                        })
                    }

                    blockUI.stop();

                    Materialize.toast(response.message, 5000);
                })

            };

            // Open details modal
            $scope.openDetails = function(uid) {
                $('#details_' + uid).openModal();

                // initiate collapsible element
                $('.collapsible').collapsible({
                    accordion: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            }

            // close details modal
            $scope.closeDetails = function(uid) {
                $('#details_' + uid).closeModal();
            }

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            }
        })

    blockUI.stop();
});