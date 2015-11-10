app.controller('list', ['$scope', '$http', function($scope, $http) {

    $scope.list = $http.get("/listinfo/" + localStorage.getItem("userListName")).success(function(data){
        $scope.list = data.listinfo;

     });

  $scope.testList = {
    name: 'My Top Ten Actors',
    content: [{
    name: 'edward scissorhands',
    description: 'lel'
  }, {
    name: 'paris hilton',
    description: 'idk'
  }, {
    name: 'katya borgos',
    description: 'why not'
  }]
}

}]);


