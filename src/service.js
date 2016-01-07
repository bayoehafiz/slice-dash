app.factory("OrderService", ['$http', function($http) {
    var obj = {};

    obj.getAllOrders = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/orders');
        //return $http.get('http://localhost:8080/admin/orders');
    }

    obj.getOrderDetails = function(phone, number) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/orders/details?phone=' + phone + '&u=' + number);
        //return $http.get('http://localhost:8080/admin/orders/details?phone=' + phone + '&u=' + number);
    }

    return obj;
}]);
