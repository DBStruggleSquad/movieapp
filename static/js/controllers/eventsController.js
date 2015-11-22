app.controller('events', ['$scope', function($scope) {
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
    }
}]);