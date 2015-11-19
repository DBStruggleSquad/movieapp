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

    $scope.showReviewModal = false;

    $scope.selectedList = '';

    $scope.setSelectedList = function(list){
      $scope.selectedList = list;
    };

    $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
  };      

    $scope.toggleReviewModal = function(){
      $scope.showReviewModal = !$scope.showReviewModal;
  };            

  //
  // For now, we get the floor function of the AVG user rating for this movie (no half stars)
  //
  $scope.getMovieRating = function() {
    return new Array(Math.floor($scope.movie.rating));
  };

  //
  // To get each reviewer's rating, we only need to set a bound; users cannot give half stars.
  //
  $scope.getReviewerRating = function(number) {
    return new Array(number);
  };  

	//--------------------------
	//FUNSIONES PARA ANADIR MOVIE A LISTA
	//--------------------------
	$scope.data2send = {movieTitle: "",  title: "", description: "", listName: ""};
	$scope.addMovie2List = function(moviename, selectedlistname){ 
		$scope.data2send.movieTitle = moviename;
		$scope.data2send.listName = selectedlistname;
		$http.post('/addmovie2list', $scope.data2send).success(function(data){
			window.alert($scope.data2send.listName + "   try  " + selectedlistname)
		}).error(function(data){
			window.alert("hola");
		});
		
	};
}]);