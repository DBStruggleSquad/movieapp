app.controller('events', ['$scope', '$http', function($scope, $http) {
  $scope.myEvents = [{
        name: '"Tomorrow" Premiere',
        date: new Date('2015','10','15'),
        host: 'dreamworks'
      }, 
      { 
        name: 'Get Together',
        date: new Date('2015','11','15'),
        host: 'joe'
      }
    ]

  $scope.publicEvents = [{
        name: '"Tomorrow" Premiere',
        date: new Date('2015','10','15'),
        host: 'dreamworks'
      }, 
      { 
        name: 'Get Together',
        date: new Date('2015','11','15'),
        host: 'joe'
      },
      { 
        name: 'Movie Night',
        date: new Date('2015','09','30'),
        host: 'katrific'
      },
      { 
        name: 'Event',
        date: new Date('2015','12','01'),
        host: 'user'
      }
    ]

    $scope.goToEvent = function(eventID){
        window.location.href = '/event-page';
    }

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





