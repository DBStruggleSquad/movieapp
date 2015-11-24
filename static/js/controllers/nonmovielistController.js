app.controller('list', ['$scope', '$http', function($scope, $http) {

	//ejemplo de un localstorage get        ---v aqui ---v
    $scope.listName = localStorage.getItem("userListName");
    $scope.list = $http.get("/listinfo-nonmovies/" + localStorage.getItem("userListName")).success(function(data){
        $scope.list = data.listinfo;
        console.log(JSON.toString($scope.list))
     });

  $scope.showModal = false;
  
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
  };

  $scope.data2send = {title: "", description: "", listName: $scope.listName };
    $scope.addpost2list = function(){ 
        $http.post('/addpost2list', $scope.data2send).success(function(data){
            location.reload(true)
        }).error(function(data){
            window.alert("hola dentro del addpost2List rn movieController");
        });
        
    };        

    //----------------
    // DELETE ITEM
    //----------------
    $scope.deleteListItem = function(listPTitle){
    	$http.post('/deletenonmovieitemfromlist', {listPostTitle: listPTitle, listTitle: localStorage.getItem("userListName")})
    	.success(function(data){
    		console.log("Item deleted");
    		location.reload(true);
    	}).error(function(data, status){
    		if(status==404){
    			$.jAlert({
    	              'title': data.title,
    	              'content': '<center>' + data.data + '</center>',
    	              'theme': 'red',
    	              'btns': { 'text': 'OK' },
    	              'showAnimation': 'zoomIn'
    	            });
    		}
    	});
    };

}]);


