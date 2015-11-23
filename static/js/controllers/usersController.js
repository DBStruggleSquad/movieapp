app.controller('users', ['$scope', '$http', function($scope,$http) {
	
    $scope.userFollows = $http.get('/userfollows').success(function(data){
        $scope.userFollows = data['following'];
        //window.alert($scope.userFollows[0].username);
    });

}]);