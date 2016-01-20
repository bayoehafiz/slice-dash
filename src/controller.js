app.controller('KitchenCtrl', function($window, $scope, $rootScope, $pusher, OrderService, ngProgressFactory) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Kitchen');

    // Pusher notification /////////////////////
    var client = new Pusher('b7b402b4f6325e3561ed');
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('test_channel');
    my_channel.bind('my_event',
        function(push_data) {
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
                        progressbar.complete();
                        // Pass values to scope
                        $rootScope.allOrders = allOrders;
                    }
                });
            })

            // show tooltip
            var $toastContent = $('<span>New Order! #' + push_data.message + '</span>');
            Materialize.toast($toastContent, 5000, 'rounded');
        }
    );

    my_channel.bind('my_event_2', // when a driver set an order to completed
        function(push_data) {
            // show tooltip
            var $toastContent = $('<span>Order #' + push_data.message + ' has been completed. Please check summary section</span>');
            Materialize.toast($toastContent, 5000, 'rounded');
        }
    );
    // eof pusher notification //////////////////

    var progressbar = ngProgressFactory.createInstance();
    // Loader bar
    progressbar.start();
    progressbar.setColor('#FFF');
    progressbar.setHeight('4px');

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
                    //console.log(allOrders);
                    progressbar.complete();

                }
            });

            // Assign courier
            $scope.assign = function(phone, number, courierName, courierPhone) {
                // Loader bar
                progressbar.start();
                progressbar.setColor('#FFF');

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
                                    progressbar.complete();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    }
                })
            };


            // Delete order
            $scope.delete = function(phone, number) {
                // Loader bar
                progressbar.start();
                progressbar.setColor('#FFF');

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
                                    progressbar.complete();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    } else {
                        progressbar.complete();
                        console.log('Failed refreshing order list!');
                    }
                })
            };


            // Refresh page
            $scope.refresh = function($route) {
                $window.location.reload();
            };


        })
});



app.controller('DriverCtrl', function($window, $scope, $rootScope, $pusher, OrderService, ngProgressFactory) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Dispatch');

    // Pusher notification /////////////////////
    var client = new Pusher('b7b402b4f6325e3561ed');
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('test_channel');
    my_channel.bind('my_event',
        function(push_data) {
            // show tooltip
            var $toastContent = $('<span>New Order: #' + push_data.message + '.<br/>Please visit Kitchen Page</span>');
            Materialize.toast($toastContent, 5000, 'rounded');
        }
    );

    my_channel.bind('my_event_2', // when a driver set an order to completed
        function(push_data) {
            // show tooltip
            var $toastContent = $('<span>Order #' + push_data.message + ' has been completed. Please check summary section</span>');
            Materialize.toast($toastContent, 5000, 'rounded');
        }
    );
    // eof pusher notification //////////////////

    // Loader bar
    var progressbar = ngProgressFactory.createInstance();
    progressbar.start();
    progressbar.setColor('#FFF');
    progressbar.setHeight('4px');

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
                    //console.log(allOrders);
                    progressbar.complete();

                }
            });



            // Assign courier
            $scope.complete = function(phone, number) {
                // Loader bar
                progressbar.start();
                progressbar.setColor('#FFF');

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
                                    progressbar.complete();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    }
                })
            };

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            };


        })
});


app.controller('CompletedCtrl', function($window, $scope, $rootScope, $pusher, OrderService, ngProgressFactory) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Summary');

    // Pusher notification /////////////////////
    var client = new Pusher('b7b402b4f6325e3561ed');
    var pusher = $pusher(client);
    var my_channel = pusher.subscribe('test_channel');
    my_channel.bind('my_event',
        function(push_data) {
            // show tooltip
            var $toastContent = $('<span>New Order: #' + push_data.message + '.<br/>Please visit Kitchen Page</span>');
            Materialize.toast($toastContent, 5000, 'rounded');
        }
    );

    my_channel.bind('my_event_2',
        function(push_data) {
            OrderService.getAllOrders().success(function(data) {
                // Collect all orders from all users
                var allOrders = [];
                angular.forEach(data, function(value) {
                    if (value.orders.length > 0) {
                        angular.forEach(value.orders, function(order) {
                            if (order.delivery.status == 'completed') {
                                allOrders.push({
                                    'phone': value.phone_no,
                                    'customer': value.fname + ' ' + value.lname,
                                    'delivery': value.delivery,
                                    'order': order
                                });
                            }
                        });
                        progressbar.complete();
                        // Pass values to scope
                        $rootScope.allOrders = allOrders;
                    }
                });
            })

            // show tooltip
            var $toastContent = $('<span>Order #' + push_data.message + ' has been completed!</span>');
            Materialize.toast($toastContent, 5000, 'rounded');
        }
    );
    // eof pusher notification //////////////////

    // Loader bar
    var progressbar = ngProgressFactory.createInstance();
    progressbar.start();
    progressbar.setColor('#FFF');
    progressbar.setHeight('4px');

    OrderService
        .getAllOrders()
        .success(function(data) {
            // Collect all orders from all users
            var allOrders = [];
            angular.forEach(data, function(value) {
                if (value.orders.length > 0) {
                    angular.forEach(value.orders, function(order) {
                        if (order.delivery.status == 'completed') {
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
                    //console.log(allOrders);
                    progressbar.complete();

                }
            });

            // Delete order
            $scope.delete = function(phone, number) {
                // Loader bar
                progressbar.start();
                progressbar.setColor('#FFF');

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
                                        if (order.delivery.status == 'completed') {
                                            allOrders.push({
                                                'phone': value.phone_no,
                                                'customer': value.fname + ' ' + value.lname,
                                                'delivery': value.delivery,
                                                'order': order
                                            });
                                        }
                                    });
                                    progressbar.complete();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    } else {
                        progressbar.complete();
                        console.log('Failed refreshing order list!');
                    }
                })
            };

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            }
        })
});
