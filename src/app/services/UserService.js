app.factory("UserService", ['$http', function($http) {
    var obj = {};

    obj.getAllUsers = function(param) {
        return $http.get('http://api.sliceapp.co:6588/api/users?sort=' + param);
    }

    obj.deleteUser = function(uid) {
        return $http.get('http://api.sliceapp.co:6588/api/users/delete?uid=' + uid);
    }

    return obj;
}]);