app.controller('KitchenCtrl', function($window, $scope, $rootScope, $pusher, OrderService, $route, blockUI) {

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

    // preloader
    blockUI.start();

    // INITIAL LOAD ORDERS 
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


            // Set a courier
            $scope.openDispatch = function(number, customer, phone, order) {
                blockUI.start();

                // reset all scopes
                $scope.orderNo = null,
                    $scope.customer = null,
                    $scope.phone = null,
                    $scope.deliveryAddr = null;
                $scope.deliveryNo = null;
                $scope.deliveryAddAddr = null;
                $scope.geoLoc = null;
                $scope.courierName = null;
                $scope.courierPhone = null;
                $('label').removeClass('active');

                // open modal
                $('#dispatch').openModal();

                // initiate scopes
                $scope.orderNo = number,
                    $scope.customer = customer,
                    $scope.phone = phone,
                    $scope.deliveryAddr = order.delivery.drop_address;
                $scope.deliveryNo = order.delivery.drop_address_number;
                $scope.deliveryAddAddr = order.delivery.additional_address;
                $scope.geoLoc = order.delivery.latitude + ',' + order.delivery.longitude;

                // initiate map
                var geo = $scope.geoLoc;
                var key = 'AIzaSyBajE1vs6LPId02HRyjpkrwJbaIn1t55Hw';
                var iconURL = 'https://upload.wikimedia.org/wikipedia/commons/4/47/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Pizzeria_%E2%80%93_Restaurants_%26_Hotels_%E2%80%93_Dark.png';

                // Google static map
                $scope.map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + geo + '&zoom=16&size=500x250&scale=2&markers=icon:' + iconURL + '%257C996600%7C' + geo + '&key=' + key;

                // open in GMaps (new modal)
                $scope.openMap = function(geoLoc) {
                    Materialize.toast(geoLoc, 4000);
                }

                // Assign a courier
                $scope.assign = function(phone, number, courierName, courierPhone) {
                    // Loader
                    blockUI.start();

                    if (!courierName) {
                        blockUI.stop();
                        Materialize.toast('Please fill courier name', 5000);
                    } else if (!courierPhone) {
                        blockUI.stop();
                        Materialize.toast('Please provide courier phone number', 5000);
                    } else {
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
                        });
                        // stop loader
                        blockUI.stop();
                        $('#dispatch').closeModal();
                    }
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
                    $('#dispatch').closeModal();
                };

                blockUI.stop();
            }


            // Refresh page
            $scope.refresh = function($route) {
                $window.location.reload();
            };


        })

    // stop preloader
    blockUI.stop();
});
