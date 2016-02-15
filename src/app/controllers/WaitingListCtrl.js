app.controller('WaitingListCtrl', function($window, $scope, $rootScope, $pusher, WaitingListService, mkBlocker, $route, blockUI) {

    // Loader bar
    blockUI.start();

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

    WaitingListService
        .getAllList()
        .success(function(data) {

            if (data.message == 'No record yet.') {
                $rootScope.allList = [];
            } else {
                $rootScope.allList = data.message;
            }

            // Confirm deleting
            $scope.confirm = function(id) {
                $('#confirm_' + id).openModal();
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
                        })
                    } else {
                        console.log('Failed refreshing waiting list!');
                    }
                })

                blockUI.stop();
            };

            // Refresh page
            $scope.refresh = function($route) {
                //$state.reload();
                $window.location.reload();
            }
        })

    blockUI.stop();
});
