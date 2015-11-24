app.controller('list', ['$scope', '$http', function($scope, $http) {

	//ejemplo de un localstorage get        ---v aqui ---v
    $scope.list = $http.get("/listinfo/" + localStorage.getItem("userListName")).success(function(data){
        $scope.list = data.listinfo;
        console.log(JSON.toString($scope.list))
     });

    //----------------
    // DELETE ITEM
    //----------------
    $scope.deleteListItem = function(listPTitle, movie){
    	$http.delete('/deletemovieitemfromlist/' + JSON.toString({listPostTitle: listPTitle, movieTitle: movie, listTitle: localStorage.getItem("userListName")}))
    	.success(function(data){
    		console.log("Item deleted");
    	});
    };
    
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


