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