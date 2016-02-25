app.controller('DriverCtrl', function($window, $scope, $rootScope, $pusher, OrderService, $route, blockUI) {
    // Loader bar
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').html('ORDERS <small>dispatch</small>');

    if ($route.current.loadedTemplateUrl == 'pages/dispatch.html') {
        // Pusher notification /////////////////////
        var client = new Pusher('b7b402b4f6325e3561ed');
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('test_channel');
        my_channel.bind('my_event',
            function(push_data) {
                // show tooltip
                var $toastContent = $('<span>New Order: #' + push_data.message + '.<br/>Please visit Kitchen Page</span>');
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
    };

    OrderService
        .getAllOrders()
        .success(function(data) {
            // Collect all orders from all users
            var allOrders = [];
            angular.forEach(data, function(value) {
                if (value.orders.length > 0) {
                    angular.forEach(value.orders, function(order) {
                        if (order.delivery.status == 'dispatched') {
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
            $scope.complete = function(phone, number) {
                // Loader bar
                blockUI.start();

                var newPhoneNumber = phone.substring(3);
                OrderService.setComplete(newPhoneNumber, number).success(function(response) {
                    if (response.success == true) {
                        //$rootScope.allOrders = [];
                        OrderService.getAllOrders().success(function(data) {
                            // Collect all orders from all users
                            var allOrders = [];
                            angular.forEach(data, function(value) {
                                if (value.orders.length > 0) {
                                    angular.forEach(value.orders, function(order) {
                                        if (order.delivery.status == 'dispatched') {
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
                });

                blockUI.stop();
            };

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            };


        })

    blockUI.stop();
});
