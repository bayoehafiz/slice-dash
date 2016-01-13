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
