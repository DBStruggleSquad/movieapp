app.controller('events', ['$scope', '$http', function($scope, $http) {
	
	
	
	$scope.myEvents = $http.get('/myevents').success(function(data){
		$scope.myEvents = data.data;
	});

  
	$scope.publicEvents = $http.get('/mypublicevent').success(function(data){
		$scope.publicEvents = data.data;
	});


  	//codigo para modal
    $scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
        //----------------------------
	    //	CODIGO PARA CREATE NEW
	    //----------------------------
	    $scope.data2send = {eventName: "", description: "", eventType: "", eventTime: 0 , eventLocation: ""};
	    $scope.createFanClub = function(){
	    	$http.post('/createEvent', $scope.data2send).success(function(data){
	    		location.reload(true);
	    	}).error(function(data, status, error){
	    		if(status == 500){
	    			window.alert("Event already exist");
	    		}else{
	    			window.alert(data.data);
	    		}
	    		
	    	});
	    }//end of create an event
    }//endo of modal
}]);





