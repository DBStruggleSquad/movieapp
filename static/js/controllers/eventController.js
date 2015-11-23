app.controller('event', ['$scope', '$http', function($scope, $http) {
	
	
	$scope.eventName = localStorage.getItem('eventName');
	$scope.event = $http.get('/eventinfo/' + $scope.eventName).success(function(data){
		$scope.event = data;
	});

	$scope.myFriends = $http.get('/myfriends').success(function(data){
		$scope.myFriends = data.data;
	});

	$scope.selectdeFriends = {};
	$scope.friends2invite = [];
    $scope.showModal1 = false;
    $scope.toggleModal1 = function(){
    	$scope.showModal1 = !$scope.showModal1;
    	//INVITE FRIENDS    	
    	$scope.inviteFriends = function(){
    		var data2send = {'eventName': $scope.eventName}
    		var keys = [];
    		for(var key in $scope.selectdeFriends){
    			console.log(key + " " + $scope.selectdeFriends[key])
    			if (String($scope.selectdeFriends[key]).localeCompare("true") == 0){
    				$scope.friends2invite.push(key);
    			}
    		}
    		data2send['users'] = $scope.friends2invite
    		$http.post('/invitetoevent', data2send ).success(function(data){
    			console.log("Invitacion exitosa");
    		}).error(function(data){
    			console.log("invitacion fallo");
    		});
    		$scope.selectdeFriends = {};
    		$scope.friends2invite = [];
    	};
    };
    $scope.showModal2 = false;
    $scope.toggleModal2 = function(){
    	$scope.showModal2 = !$scope.showModal2;
    };
}]);