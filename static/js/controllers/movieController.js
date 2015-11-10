//= require_tree .
app.controller('profile', ['$scope', '$http', function($scope, $http) {
	$scope.movie = $http.get("/movieinfo/" + localStorage.getItem("movieTitle")).success(function(data){
	  	$scope.movie = data;
	}).error(function(data){
	  		window.alert("hola");
	});
	
	
	$scope.movieReviews = $http.get('/moviereviews/' + localStorage.getItem("movieTitle")).success(function(data){
	  	$scope.movieReviews = data;
	});

	$scope.availableLists = $http.get('/usermovielistnames' ).success(function(data){
  		$scope.availableLists = data.lists;
  	});

	$scope.tabs = [{
            title: 'Info',
            url: 'info.tpl.html'
        }, {
            title: 'Reviews',
            url: 'reviews.tpl.html'
        }];

    $scope.currentTab = 'info.tpl.html'; //default opened tab

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    };

    $scope.showModal = false;

    $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
  };        

	//--------------------------
	//FUNSIONES PARA ANADIR MOVIE A LISTA
	//--------------------------
	$scope.data2send = {movieTitle: $scope.movie.name,  title: "", description: ""};
	$scope.addMovie2List = function(){
		$http.post('/addmovie2list', $scope.data2send).success(function(data){
			window.alert($scope.data2send.movieTitle+ "   " + $scope.data2send.description + "   " + $scope.data2send.title);
		}).error(function(data){
			window.alert(data);
		});
		
	};
}]);