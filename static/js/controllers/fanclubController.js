app.controller('fanclub', ['$scope', '$http', function($scope, $http) {
	$scope.fanClubName = localStorage.getItem("fanClubName");
	$scope.fanclub = $http.get('/fanclubinfo/' + $scope.fanClubName).success(function(data){
		$scope.fanclub = data;
	}).error(function(data){
		window.alert("There was an error extracting the information for the fanclub: " + $scope.fanClubName);
	});
	
 
}]);