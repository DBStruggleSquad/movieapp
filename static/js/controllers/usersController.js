app.controller('users', ['$scope', '$http', function($scope,$http) {
	
    $scope.userFollows = $http.get('/userfollows').success(function(data){
        $scope.userFollows = data['following'];
        //window.alert($scope.userFollows[0].username);
    });
    
    $scope.userFollowers = $http.get('/userfollowers').success(function(data){
        $scope.userFollowers = data['following'];
        //window.alert($scope.userFollows[0].username);
    });

    $scope.buisinessPages = $http.get('/businesspages').success(function(data){
        $scope.buisinessPages = data['following'];
        //window.alert($scope.userFollows[0].username);
    });
    
    //===========================================
    //		CODIGO PARA SEARCH
    //===========================================
    $scope.searchTxtMessage = "Search...";

    $scope.searchUsers = function(txtForSearch){
    	if (txtForSearch){
    		localStorage.removeItem("userSrchTxt");
    		localStorage.setItem("userSrchTxt", txtForSearch);
    		window.location.href = "/search-results-users?" + txtForSearch;
    		//proximos codigos en searchResultController dado que se hace rendering de search-result.html
    		
    	}else{
    		$scope.searchTxtMessage = "Please insert text for search...";
        	//window.alert("No se ha ingresado texto para el search, intente de nuevo...");
    	}
    	
    };    

}]);