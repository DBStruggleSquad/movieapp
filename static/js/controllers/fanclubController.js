app.controller('fanclub', ['$scope', '$http', function($scope, $http) {
	
	$scope.fanClubName = localStorage.getItem("fanClubName");
	$scope.fanclub = $http.get('/fanclubinfo/' + $scope.fanClubName).success(function(data){
		$scope.fanclub = data;
	}).error(function(data){
		window.alert("There was an error extracting the information for the fanclub: " + $scope.fanClubName);
	});
	
	$scope.data2sendfollow = {title: "", user: ""};
	$scope.addfollowfanclub = function(fanClubN){ 
    $scope.data2sendfollow.title = fanClubN;

    //---------------
    // FOLLOW 
    //---------------
    $scope.data2sendfollow.user = $scope.fanclub.director;
    $http.post('/followfanclub', $scope.data2sendfollow).success(function(data){
    	location.reload(true)
    }).error(function(data){
    	window.alert("hola followfanclub");
    });
  };	
 
}]);