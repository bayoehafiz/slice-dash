app.factory("OrderService", ['$http', function($http) {
    var obj = {};

    obj.getAllOrders = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/orders');
        //return $http.get('http://localhost:8080/admin/orders');
    }

    obj.getOrderDetails = function(phone, number) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/order/details?phone=' + phone + '&u=' + number);
        //return $http.get('http://localhost:8080/admin/order/details?phone=' + phone + '&u=' + number);
    }

    obj.deleteOrder = function(phone, number) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/order/delete?phone=' + phone + '&u=' + number);
        //return $http.get('http://localhost:8080/admin/order/delete?phone=' + phone + '&u=' + number);
    }

    obj.assignCourier = function(phone, number, courierName, courierPhone) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/order/assign?phone=' + phone + '&u=' + number + '&cname=' + courierName + '&cphone=' + courierPhone);
        //return $http.get('http://localhost:8080/admin/order/assign?phone=' + phone + '&u=' + number + '&cname=' + courierName + '&cphone=' + courierPhone);
    }

    obj.setComplete = function(phone, number) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/order/complete?phone=' + phone + '&u=' + number);
        //return $http.get('http://localhost:8080/admin/order/complete?phone=' + phone + '&u=' + number);
    }

    return obj;
}]);

app.factory("WaitingListService", ['$http', function($http) {
    var obj = {};

    obj.getAllList = function() {
        return $http.get('http://node.colorblindlabs.com:8080/api/access');
    }

    obj.deleteList = function(phone) {
        return $http.get('http://node.colorblindlabs.com:8080/api/access/delete?phone=' + phone);
    }

    return obj;
}]);

app.factory("MenuUpdaterService", ['$http', function($http) {
    var obj = {};

    obj.getMenu = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu');
        //return $http.get('http://localhost:8080/admin/menu');
    }

    obj.getUploadLink = function() {
        return 'http://node.colorblindlabs.com:8080/admin/menu';
    }

    return obj;
}]);

app.provider('PusherService', function() {
    var apiKey = 'b7b402b4f6325e3561ed';
    var initOptions = {};

    this.setOptions = function(options) {
        initOptions = options || initOptions;
        return this;
    };

    this.setToken = function(token) {
        apiKey = token || apiKey;
        return this;
    };

    this.$get = ['$window', '$rootScope',
        function($window, $rootScope) {
            var pusher = new $window.Pusher(apiKey, initOptions),
                oldTrigger = pusher.trigger; // <-- save off the old pusher.trigger

            pusher.trigger = function decoratedTrigger() {
                // here we redefine the pusher.trigger to:

                // 1. run the old trigger and save off the result
                var result = oldTrigger.apply(pusher, arguments);

                // 2. kick off the $digest cycle
                $rootScope.$digest();

                // 3. return the result from the the original pusher.trigger
                return result;
            };

            return pusher;
        }
    ];
});
