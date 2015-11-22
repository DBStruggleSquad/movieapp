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
  }    
}]);