app.controller('MenuUpdaterCtrl', function($window, $scope, $rootScope, $pusher, mkBlocker, $route, MenuUpdaterService, $http, blockUI) {
    blockUI.start();

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

    blockUI.stop();
});