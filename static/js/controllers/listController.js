app.controller('list', ['$scope', '$http', function($scope, $http) {

    $scope.list = $http.get("/listinfo/" + localStorage.getItem("userListName")).success(function(data){
        $scope.list = data.listinfo;

     });
}]);


