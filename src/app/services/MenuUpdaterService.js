app.factory("MenuUpdaterService", ['$http', function($http) {
    var obj = {};

    obj.getPizzas = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/pizza');
        //return $http.get('http://localhost:8080/admin/menu');
    }

    obj.getIngredients = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/pizza/ingredients');
        //return $http.get('http://localhost:8080/admin/pizza/ingredients');
    }    

    obj.deletePizza = function(id) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/pizza/delete?id=' + id);
        //return $http.get('http://localhost:8080/admin/pizza/delete?id=' + id);
    }

    obj.deleteIngredient = function(id) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/pizza/ingredients/delete?id=' + id);
        //return $http.get('http://localhost:8080/admin/pizza/delete?id=' + id);
    }

    obj.publishPizza = function(id) {
        return $http.get('http://node.colorblindlabs.com:8080/admin/pizza/publish?id=' + id);
        //return $http.get('http://localhost:8080/admin/pizza/delete?id=' + id);
    }

    obj.getExtras = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/extra');
        //return $http.get('http://localhost:8080/admin/menu');
    }

    obj.releaseMenu = function() {
        return $http.get('http://node.colorblindlabs.com:8080/admin/pizza/release');
        // return $http.get('http://localhost:8080/admin/pizza/release');
    }

    obj.getUploadLink = function() {
        return 'http://node.colorblindlabs.com:8080/admin/pizza/add';
        //return 'http://localhost:8080/admin/pizza/add';
    }

    obj.getAddIngredientLink = function() {
        return 'http://node.colorblindlabs.com:8080/admin/pizza/ingredients/add';
        //return 'http://localhost:8080/admin/pizza/add';
    }

    return obj;
}]);