app.controller('list', ['$scope', '$http', function($scope, $http) {

	//ejemplo de un localstorage get        ---v aqui ---v
    $scope.list = $http.get("/listinfo-nonmovies/" + localStorage.getItem("userListName")).success(function(data){
        $scope.list = data.listinfo;
        console.log(JSON.toString($scope.list))
     });

  $scope.showModal = false;
  
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
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


