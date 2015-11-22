app.controller('fanclub', ['$scope', '$http', function($scope, $http) {
	$scope.fanClubName = localStorage.getItem("fanClubName");
	$scope.fanclub = $http.get('/fanclubinfo/' + $scope.fanClubName).success(function(data){
		$scope.fanclub = data;
	}).error(function(data){
		window.alert("There was an error extracting the information for the fanclub: " + $scope.fanClubName);
	});
	
	$scope.data2sendfollow = {title: ""};
  $scope.addfollowfanclub = function(fanClubN){ 
    $scope.data2sendfollow.title = fanClubN;
    $http.post('/followfanclub', $scope.data2sendfollow).success(function(data){
      window.alert("worked")
    }).error(function(data){
      window.alert("hola followfanclub");
    });
  };	
 
}]);