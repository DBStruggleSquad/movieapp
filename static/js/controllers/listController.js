app.controller('list', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
  
  $scope.list = {
    name: 'My Top 30',
    movies: [{
    title: 'Avatar',
    year: '2009',
  }, {
    title: 'Avengers',
    year: 'some year',
  }, {
    title: 'Some movie',
    year: 'some year',
  }]
}

    $rootScope.$on("listCtrlMethods", function(){
        $scope.setListInfo(listName);
    });

    $scope.setListInfo = function(listName){
        $http.get('/listinfo/intento').success(function(data){
            $scope.list = data;
            window.alert(data);
        }).error(function(data){
            window.alert("setlist fail");
        });
    }
}]);