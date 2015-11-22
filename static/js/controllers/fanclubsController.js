app.controller('fanclubs', ['$scope', '$http', function($scope, $http) {
	
	$scope.myFanclubs = $http.get('/myfanclubs').success(function(data){
		$scope.myFanclubs = data.data;
	});
		

	$scope.publicFanclubs = $http.get('/mypublicfanclubs').success(function(data){
		$scope.publicFanclubs = data.data;
	});

    $scope.showModal = false;
    $scope.toggleModal = function(){
	    $scope.showModal = !$scope.showModal;
	    
	    //----------------------------
	    //	CODIGO PARA CREATE NEW
	    //----------------------------
	    $scope.data2send = {clubname: "", rol: "", description: ""}
	    $scope.createFanClub = function(){
	    	
	  	  	if($scope.data2send.clubname  && $scope.data2send.rol && $scope.data2send.description ){
			  $http.post('/addfanclub', $scope.data2send).success(function(data){
				  location.reload(true)
			  }).error(function(data){
				  window.alert("Fan Club already exist");
			  });
		  }else{
			  window.alert("All the fields have to be completed");
		  }
	    }
    }//final del modal    
}]);