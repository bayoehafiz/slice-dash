app.controller('KitchenCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route, blockUI) {
    // preloader
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').html('ORDERS <small>kitchen</small>');

    // Pusher notification /////////////////////
    var client = new Pusher('b7b402b4f6325e3561ed');
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('test_channel');
    my_channel.bind('my_event',
        function(push_data) {
            blockUI.start();

            OrderService.getAllOrders().success(function(data) {
                // Collect all orders from all users
                var allOrders = [];
                angular.forEach(data, function(value) {
                    if (value.orders.length > 0) {
                        angular.forEach(value.orders, function(order) {
                            if (order.delivery.status == 'processed') {
                                allOrders.push({
                                    'phone': value.phone_no,
                                    'customer': value.fname + ' ' + value.lname,
                                    'delivery': value.delivery,
                                    'order': order
                                });
                            }
                        });
                        // Pass values to scope
                        $rootScope.allOrders = allOrders;

                    }
                });
            })

            blockUI.stop();

            // show tooltip
            var $toastContent = $('<span>New Order! #' + push_data.message + '</span>');
            Materialize.toast($toastContent, 5000);
        }
    );

    my_channel.bind('my_event_2', // when a driver set an order to completed
        function(push_data) {
            // show tooltip
            var $toastContent = $('<span>Order #' + push_data.message + ' has been completed. Please check summary section</span>');
            Materialize.toast($toastContent, 5000);
        }
    );
    // eof pusher notification //////////////////


    OrderService
        .getAllOrders()
        .success(function(data) {
            // Collect all orders from all users
            var allOrders = [];
            angular.forEach(data, function(value) {
                if (value.orders.length > 0) {
                    angular.forEach(value.orders, function(order) {
                        //console.log(order);
                        if (order.delivery.status == 'processed') {
                            allOrders.push({
                                'phone': value.phone_no,
                                'customer': value.fname + ' ' + value.lname,
                                'delivery': value.delivery,
                                'order': order
                            });
                        }
                    });
                    // Pass values to scope
                    $rootScope.allOrders = allOrders;
                }
            });

            // Assign courier
            $scope.assign = function(phone, number, courierName, courierPhone) {
                // Loader
                blockUI.start();

                var newPhoneNumber = phone.substring(3);
                OrderService.assignCourier(newPhoneNumber, number, courierName, courierPhone).success(function(response) {
                    if (response.success == true) {
                        //$rootScope.allOrders = [];
                        OrderService.getAllOrders().success(function(data) {
                            // Collect all orders from all users
                            var allOrders = [];
                            angular.forEach(data, function(value) {
                                if (value.orders.length > 0) {
                                    angular.forEach(value.orders, function(order) {
                                        if (order.delivery.status == 'processed') {
                                            allOrders.push({
                                                'phone': value.phone_no,
                                                'customer': value.fname + ' ' + value.lname,
                                                'delivery': value.delivery,
                                                'order': order
                                            });
                                        }
                                    });
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    }
                })

                // stop loader
                blockUI.stop();
            };


            // Delete order
            $scope.delete = function(phone, number) {
                // Loader bar
                blockUI.start();

                var phoneNumber = phone.replace(/[^\w\s]/gi, '');
                //console.log(phoneNumber, number);
                OrderService.deleteOrder(phoneNumber, number).success(function(response) {
                    var status = response.success;
                    if (status == true) {
                        //$rootScope.allOrders = [];
                        OrderService.getAllOrders().success(function(data) {
                            // Collect all orders from all users
                            var allOrders = [];
                            angular.forEach(data, function(value) {
                                if (value.orders.length > 0) {
                                    angular.forEach(value.orders, function(order) {
                                        allOrders.push({
                                            'phone': value.phone_no,
                                            'customer': value.fname + ' ' + value.lname,
                                            'delivery': value.delivery,
                                            'order': order
                                        });
                                    });
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    } else {
                        console.log('Failed refreshing order list!');
                    }
                })

                blockUI.stop();
            };


            // Refresh page
            $scope.refresh = function($route) {
                $window.location.reload();
            };


        })

    // stop preloader
    blockUI.stop();
});
