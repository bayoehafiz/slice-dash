app.controller('KitchenCtrl', function($window, $scope, $rootScope, OrderService, ngProgressFactory) {
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
                        allOrders.push({
                            'phone': value.phone_no,
                            'customer': value.fname + ' ' + value.lname,
                            'delivery': value.delivery,
                            'order': order
                        });
                    });
                    // Pass values to scope
                    $rootScope.allOrders = allOrders;
                    //console.log(allOrders);
                    progressbar.complete();

                }
            });

            // Show order details
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

                        console.log('Failed!');
                    }
                })
            };

            // Assign courier
            $scope.assign = function(phone, number) {
                alert('Assigning courier is disabled for now...')
            }

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            }


        })
});



app.controller('DriverCtrl', function($window, $scope, $rootScope, OrderService, ngProgressFactory) {
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
                        allOrders.push({
                            'phone': value.phone_no,
                            'customer': value.fname + ' ' + value.lname,
                            'delivery': value.delivery,
                            'order': order
                        });
                    });
                    // Pass values to scope
                    $rootScope.allOrders = allOrders;
                    //console.log(allOrders);
                    progressbar.complete();

                }
            });

            // Show order details
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

                        console.log('Failed!');
                    }
                })
            };

            // Assign courier
            $scope.complete = function(phone, number) {
                alert('Completing an order is disabled for now...')
            }

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            }


        })
});


app.controller('CompletedCtrl', function($window, $scope, $rootScope, OrderService, ngProgressFactory) {
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
                        allOrders.push({
                            'phone': value.phone_no,
                            'customer': value.fname + ' ' + value.lname,
                            'delivery': value.delivery,
                            'order': order
                        });
                    });
                    // Pass values to scope
                    $rootScope.allOrders = allOrders;
                    //console.log(allOrders);
                    progressbar.complete();

                }
            });

            // Show order details
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

                        console.log('Failed!');
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

