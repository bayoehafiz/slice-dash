app.controller('KitchenCtrl', function($window, $scope, $rootScope, $pusher, OrderService, $route, blockUI) {
    // preloader
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').html('ORDERS <small>kitchen</small>');

    // Get static maps function
    function getStaticMap(lat, long) {
        var url = 'https://maps.googleapis.com/maps/staticmap?center=' + lat + ',' + long + '&zoom=14&size=300x200&maptype=roadmap&markers=color:red%7Clabel:D%7C' + lat + ',' + long + '&key=x9zt0CqTiC-fOE8bvd4KJ746pr4=';
        //var url = "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284"
        return url;
    }

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
                                var map = [{
                                    color: 'blue',
                                    label: 'X',
                                    coords: order.delivery.latitude + ',' + order.delivery.longitude
                                }];

                                allOrders.push({
                                    'phone': value.phone_no,
                                    'customer': value.fname + ' ' + value.lname,
                                    'delivery': value.delivery,
                                    'order': order,
                                    'markers': map
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
                            var map = [{
                                color: 'blue',
                                label: 'X',
                                coords: [order.delivery.latitude + ',' + order.delivery.longitude]
                            }];

                            allOrders.push({
                                'phone': value.phone_no,
                                'customer': value.fname + ' ' + value.lname,
                                'delivery': value.delivery,
                                'order': order,
                                'markers': map
                            });
                        }
                    });
                    // Pass values to scope
                    $rootScope.allOrders = allOrders;
                }
            });


            // Set a courier
            $scope.setCourier = function(number) {
                Materialize.toast('Courier for #' + number, 5000);
            }

            // Assign a courier
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
                                            var map = [{
                                                color: 'blue',
                                                label: 'X',
                                                coords: [order.delivery.latitude + ',' + order.delivery.longitude]
                                            }];

                                            allOrders.push({
                                                'phone': value.phone_no,
                                                'customer': value.fname + ' ' + value.lname,
                                                'delivery': value.delivery,
                                                'order': order,
                                                'markers': map
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


            // Confirm deleting
            $scope.confirm = function(number) {
                $('#confirm_' + number).openModal();
            }

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
                                        var map = [{
                                            color: 'blue',
                                            label: 'X',
                                            coords: [order.delivery.latitude + ',' + order.delivery.longitude]
                                        }];

                                        allOrders.push({
                                            'phone': value.phone_no,
                                            'customer': value.fname + ' ' + value.lname,
                                            'delivery': value.delivery,
                                            'order': order,
                                            'markers': map
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
