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

$scope.data2sendPost = {title: "", post: "", club: $scope.fanClubName};
$scope.addfanpost = function(){
    $http.post('/addfanpost', $scope.data2sendPost).success(function(data){
        location.reload(true)
    }).error(function(data, status){
        if(status == 404){
            $.jAlert({
                'title': data.title,
                'content': data.data,
                'theme': 'black',
                'btns': { 'text': 'Close' },
                'showAnimation': 'zoomIn'
            });
        }else {
            $.jAlert({
                'title': "Connection Error",
                'content': "Your request can not be execute, please try again later.",
                'theme': 'black',
                'btns': { 'text': 'Close' },
                'showAnimation': 'zoomIn'
            });
        }
    });
};	

}]);