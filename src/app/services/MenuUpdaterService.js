app.factory("MenuUpdaterService", ['$http', function($http) {
    var obj = {};

    obj.getMenu = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu');
        //return $http.get('http://localhost:8080/admin/menu');
    }

    obj.getUploadLink = function() {
        return 'http://node.colorblindlabs.com:8080/admin/menu/add';
        //return 'http://localhost:8080/admin/menu/add';
    }

    return obj;
}]);