app.controller('KitchenCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Kitchen');

    // get current state

    if ($route.current.loadedTemplateUrl == 'pages/kitchen.html') {
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
                            //mkBlocker.unblockUI();
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
    };


    mkBlocker.blockUI();

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
                    //mkBlocker.unblockUI();

                }
            });

            // Assign courier
            $scope.assign = function(phone, number, courierName, courierPhone) {
                // Loader bar
                mkBlocker.blockUI();


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
                                    //mkBlocker.unblockUI();
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
                mkBlocker.blockUI();


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
                                    //mkBlocker.unblockUI();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    } else {
                        //mkBlocker.unblockUI();
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



app.controller('DriverCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Dispatch');


    if ($route.current.loadedTemplateUrl == 'pages/dispatch.html') {
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
    };

    // Loader bar

    mkBlocker.blockUI();



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
                    //mkBlocker.unblockUI();

                }
            });



            // Assign courier
            $scope.complete = function(phone, number) {
                // Loader bar
                mkBlocker.blockUI();


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
                                    //mkBlocker.unblockUI();
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


app.controller('CompletedCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Summary');


    if ($route.current.loadedTemplateUrl == 'pages/complete.html') {
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
                            //mkBlocker.unblockUI();
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
    }


    // Loader bar

    mkBlocker.blockUI();



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
                    //mkBlocker.unblockUI();

                }
            });

            // Delete order
            $scope.delete = function(phone, number) {
                // Loader bar
                mkBlocker.blockUI();


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
                                    //mkBlocker.unblockUI();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    } else {
                        //mkBlocker.unblockUI();
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


app.controller('WaitingListCtrl', function($window, $scope, $rootScope, $pusher, WaitingListService, mkBlocker, $route) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Waiting List');


    if ($route.current.loadedTemplateUrl == 'pages/waiting_list.html') {
        // Pusher notification /////////////////////
        var client = new Pusher('b7b402b4f6325e3561ed');
        var pusher = $pusher(client);
        var my_channel = pusher.subscribe('test_channel');
        my_channel.bind('my_event_3',
            function(push_data) {
                WaitingListService.getAllList().success(function(data) {
                    // Collect all orders from all users
                    $rootScope.allList = data.message;
                })
            }
        );
        // eof pusher notification //////////////////
    }

    // Loader bar

    mkBlocker.blockUI();



    WaitingListService
        .getAllList()
        .success(function(data) {

            if (data.message == 'No record yet.') {
                $rootScope.allList = [];
            } else {
                $rootScope.allList = data.message;
            }

            // Delete order
            $scope.delete = function(phone) {
                // Loader bar
                mkBlocker.blockUI();


                var phoneNumber = phone.replace(/[^\w\s]/gi, '');

                WaitingListService.deleteList(phoneNumber).success(function(response) {
                    var status = response.success;
                    if (status == true) {
                        //$rootScope.allOrders = [];
                        WaitingListService.getAllList().success(function(data) {

                            if (data.message == 'No record yet.') {
                                $rootScope.allList = [];
                            } else {
                                $rootScope.allList = data.message;
                            }

                            //mkBlocker.unblockUI();
                        })
                    } else {
                        //mkBlocker.unblockUI();
                        console.log('Failed refreshing waiting list!');
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

app.controller('MenuUpdaterCtrl', function($window, $scope, $rootScope, $pusher, mkBlocker, $route, MenuUpdaterService, $http) {
    // Dynamic subtitle
    $('#logo-subtitle').text('Menu Updater');

    MenuUpdaterService.getMenu().success(function(response) {
        var ver = 0,
            rel = '',
            data = [],
            num = 0;

        var status = response.status;
        if (status == true) {
            ver = response.message.version;
            rel = response.message.release;
            data = response.message.data;
            num = data.length;
        }

        console.log("Data length: " + num);

        $scope.version = ver;
        $scope.release = rel;
        $scope.data = data;
        $scope.num = num;

    })
});

app.controller('AddPizzaCtrl', function($window, $scope, $rootScope, $pusher, mkBlocker, $route, MenuUpdaterService, $http) {
    // Dynamic subtitle
    $('#logo-subtitle').html('Add Pizza');

    $('.tooltipped').tooltip({delay: 50});

    // Size dropdown datas
    $scope.sizes = [{
        id: 1,
        label: 'SMALL',
        name: 'small'
    }, {
        id: 2,
        label: 'REGULAR',
        name: 'regular'
    }, {
        id: 3,
        label: 'LARGE',
        name: 'large'
    }];

    // Crust dropdown datas
    $scope.crusts = [{
        id: 1,
        label: 'THIN',
        name: 'thin'
    }, {
        id: 2,
        label: 'THICK',
        name: 'thick'
    }, {
        id: 3,
        label: 'MEDIUM',
        name: 'medium'
    }, {
        id: 4,
        label: 'SOFT',
        name: 'soft'
    }, {
        id: 5,
        label: 'CRACKER',
        name: 'cracker'
    }];

    // Ingredients dropdown datas
    $scope.ingredients = [{
        id: 1,
        label: 'ONIONS',
        name: 'onions'
    }, {
        id: 2,
        label: 'PARSLEY',
        name: 'parsley'
    }, {
        id: 3,
        label: 'SALAMI',
        name: 'salami'
    }, {
        id: 4,
        label: 'TOMATOES',
        name: 'tomatoes'
    }, {
        id: 5,
        label: 'TUNA',
        name: 'tuna'
    }, {
        id: 6,
        label: 'BBQ SAUCE',
        name: 'bbq_sauce'
    }, {
        id: 7,
        label: 'BLACK OLIVE',
        name: 'black_olive'
    }, {
        id: 8,
        label: 'GARLIC CLOVES',
        name: 'garlic_cloves'
    }, {
        id: 9,
        label: 'MOZARELLA CHEESE',
        name: 'mozarella_cheese'
    }, {
        id: 10,
        label: 'OREGANO',
        name: 'oregano'
    }, {
        id: 11,
        label: 'PINEAPPLE',
        name: 'pineapple'
    }, {
        id: 12,
        label: 'CORN',
        name: 'corn'
    }, {
        id: 13,
        label: 'HAM',
        name: 'ham'
    }, {
        id: 14,
        label: 'JALAPENO',
        name: 'jalapeno'
    }];

    $scope.$on("cropme:loaded", function(ev, width, height, cropmeEl) {
        // Get the right image ratio (0.62:1)
        var ratio = width / height;
        if (ratio != 0.6153846153846154) {
            $scope.$broadcast("cropme:cancel");
            Materialize.toast('FAILED! Image ratio must be 0.62:1 (ex. 800p X 1300p)', 5000);
        }
    });

    $scope.processForm = function(pizza) {

        // Get uploaded image state
        var imageData = $("cropme").find('.responsive-img').attr('ng-src');
        if (imageData == undefined || !imageData) {
            var image = undefined;
        } else {
            var image = $("cropme").find('.responsive-img').attr('src');
        }

        // Handle image submission
        $scope.$broadcast("cropme:ok");
        $scope.$on("cropme:done", function(ev, result, cropmeEl) {
            // get upload link
            var url = MenuUpdaterService.getUploadLink();
            // Handle the form submission...
            master = angular.copy(pizza);
            if (master == undefined) {
                Materialize.toast('Empty field!', 5000);
            } else {
                datas = {
                    name: master.name,
                    sizes: master.size,
                    crusts: master.crust,
                    ingredients: master.ingredient,
                    description: master.description,
                    price: master.price,
                    image: image
                };
                console.log(datas);
                // send to server
                $http.post(url, datas).then(function(res) {
                    console.log(res);
                });
            };
        });
    };

});
