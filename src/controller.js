app.controller('KitchenCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route, blockUI) {
    // preloader
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').text('KITCHEN');

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

                    // stop preloader
                    blockUI.stop();
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

                                    // stop loader
                                    blockUI.stop();
                                }
                            });
                        })
                    }
                })
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

                                    blockUI.stop();
                                }
                            });
                        })
                    } else {
                        blockUI.stop();

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


app.controller('DriverCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route, blockUI) {
    // Loader bar
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').text('DISPATCH');


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

                    blockUI.stop();
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

                                    blockUI.stop();
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


app.controller('CompletedCtrl', function($window, $scope, $rootScope, $pusher, OrderService, mkBlocker, $route, blockUI) {
    // Loader bar
    blockUI.start();

    // Dynamic subtitle
    $('#logo-subtitle').text('SUMMARY');

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
                            // Pass values to scope
                            $rootScope.allOrders = allOrders;

                            blockUI.stop();
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

                    blockUI.stop();
                }
            });

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
                                        if (order.delivery.status == 'completed') {
                                            allOrders.push({
                                                'phone': value.phone_no,
                                                'customer': value.fname + ' ' + value.lname,
                                                'delivery': value.delivery,
                                                'order': order
                                            });
                                        }
                                    });
                                    blockUI.stop();
                                    // Pass values to scope
                                    $rootScope.allOrders = allOrders;
                                }
                            });
                        })
                    } else {
                        blockUI.stop();
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


app.controller('WaitingListCtrl', function($window, $scope, $rootScope, $pusher, WaitingListService, mkBlocker, $route, blockUI) {
    // Dynamic subtitle
    $('#logo-subtitle').text('WAITING LIST');


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

    blockUI.start();



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
                blockUI.start();


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

                            blockUI.stop();
                        })
                    } else {
                        blockUI.stop();
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


app.controller('MenuUpdaterCtrl', function($window, $scope, $rootScope, $pusher, mkBlocker, $route, MenuUpdaterService, $http, blockUI) {
    // Dynamic subtitle
    $('#logo-subtitle').text('MENU UPDATER');

    MenuUpdaterService.getMenu().success(function(data) {

        if (data.success == true) {
            $scope.menu = data.message;
        } else {
            $scope.menu = [];
        }

        $scope.pizza = {};


        // Initiate collapsible element
        $('.collapsible').collapsible({
            accordion: true
        });

        // reset form function
        var resetForm = function() {
            $scope.pizza = {};
        }

        // Open modal
        $scope.openModal = function(uid) {
            $('#add-item-modal').openModal();

            $('.tooltipped').tooltip({
                delay: 50
            });

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

            $scope.save = function(pizza) {
                // Get uploaded image state
                var imageData = $("cropme").find('.responsive-img').attr('ng-src');
                if (imageData == undefined || !imageData) {
                    var image = undefined;
                } else {
                    var image = $("cropme").find('.responsive-img').attr('src');
                }
                // Handle image submission
                $scope.$broadcast("cropme:ok");

                // get upload link
                var url = MenuUpdaterService.getUploadLink();

                // Handle the form submission...
                master = angular.copy(pizza);

                // Form Validation !!!
                if (master.name == undefined) {
                    Materialize.toast('Please enter NAME!', 5000);
                } else if (master.price == undefined) {
                    Materialize.toast('Please set PRICE!', 5000);
                } else if (master.description == undefined) {
                    Materialize.toast('Please fill in DESCRIPTION!', 5000);
                } else if (master.crust == undefined) {
                    Materialize.toast('You have to provide CRUSTS!', 5000);
                } else if (master.ingredient == undefined) {
                    Materialize.toast('You have to provide INGREDIENTS!', 5000);
                } else if (master.size == undefined) {
                    Materialize.toast('Please choose SIZES', 5000);
                } else if (image == undefined) {
                    Materialize.toast('The pizza need an IMAGE!', 5000);
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

                    // send to server
                    $http.post(url, datas).then(function(response) {
                        if (response.success == true) {
                            $('#add-item-modal').closeModal();
                            // reload items on menu
                            MenuUpdaterService.getMenu().success(function(data) {
                                if (data.success == true) {
                                    $scope.menu = data.message;
                                } else {
                                    $scope.menu = [];
                                }
                            })
                        }
                        Materialize.toast(response.message, 5000);
                    });
                };

            };
        }

        // release current menu
        $scope.release = function() {
            Materialize.toast("Releasing new menu update...", 5000);
        }

        // close modal
        $rootScope.closeModal = function(uid) {
            $('#add-item-modal').closeModal();
        }

    })
});
