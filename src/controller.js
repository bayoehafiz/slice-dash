app.controller('SliceCtrl', function($scope, $rootScope, $mdDialog, $mdMedia, OrderService) {
    OrderService
        .getAllOrders()
        .success(function(data) {
            // Collect all orders from all users
            var allOrders = [];
            angular.forEach(data, function(value) {
                if (value.orders.length > 0) {
                    angular.forEach(value.orders, function(order) {
                        allOrders.push({
                            'phone': value.phone_no,
                            'customer': value.fname + ' ' + value.lname,
                            'delivery': order.delivery,
                            'order': order
                        });
                    });
                    // Pass values to scope
                    $scope.allOrders = allOrders;
                }
            });

            // Show order details
            $scope.showDetails = function(ev, phone, number, customer) {
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;

                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'details.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: useFullScreen
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });


                $scope.$watch(function() {
                    return $mdMedia('xs') || $mdMedia('sm');
                }, function(wantsFullScreen) {
                    $scope.customFullscreen = (wantsFullScreen === true);
                });


                function DialogController($scope, $mdDialog) {
                    $scope.number = number;
                    $scope.phone = phone.replace(/[^\w\s]/gi, '');
                    $scope.customer = customer;

                    OrderService.getOrderDetails($scope.phone, $scope.number).success(function(response) {
                    	$scope.orders = response.details;
                    	//console.log(response.details.pizza);
                    });

                    $scope.hide = function() {
                        $mdDialog.hide();
                    };

                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };

                    $scope.answer = function(answer) {
                        $mdDialog.hide(answer);
                    };
                }

            };
        })
});
