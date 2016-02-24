app.factory("MenuUpdaterService", ['$http', function($http) {
    var obj = {};

    obj.getMenu = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu');
        //return $http.get('http://localhost:8080/admin/menu');
    }

    obj.getIngredients = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu/ingredients');
        //return $http.get('http://localhost:8080/admin/menu/ingredients');
    }    

    obj.deletePizza = function(id) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu/delete?id=' + id);
        //return $http.get('http://localhost:8080/admin/menu/delete?id=' + id);
    }

    obj.publishPizza = function(id) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu/publish?id=' + id);
        //return $http.get('http://localhost:8080/admin/menu/delete?id=' + id);
    }

    obj.releaseMenu = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/menu/release');
        // return $http.get('http://localhost:8080/admin/menu/release');
    }

    obj.getUploadLink = function() {
        return 'http://node.colorblindlabs.com:8080/admin/menu/add';
        //return 'http://localhost:8080/admin/menu/add';
    }

    return obj;
}]);