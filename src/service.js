app.factory("OrderService", ['$http', function($http) {
    var obj = {};

    obj.getAllOrders = function() {
        return $http.get('http://128.199.117.202:8080/admin/orders');
        //return $http.get('http://localhost:8080/admin/orders');
    }

    obj.getOrderDetails = function(phone, number) {
        return $http.get('http://128.199.117.202:8080/admin/order/details?phone=' + phone + '&u=' + number);
        //return $http.get('http://localhost:8080/admin/order/details?phone=' + phone + '&u=' + number);
    }

    obj.deleteOrder = function(phone, number) {
        return $http.get('http://128.199.117.202:8080/admin/order/delete?phone=' + phone + '&u=' + number);
        //return $http.get('http://localhost:8080/admin/order/delete?phone=' + phone + '&u=' + number);
    }

    return obj;
}]);
