app.factory("WaitingListService", ['$http', function($http) {
    var obj = {};

    obj.getAllList = function() {
        return $http.get('http://api.sliceapp.co:6588/api/access');
    }

    obj.deleteList = function(phone) {
        return $http.get('http://api.sliceapp.co:6588/api/access/delete?phone=' + phone);
    }

    return obj;
}]);