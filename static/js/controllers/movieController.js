//= require_tree .
app.controller('profile', ['$scope', '$http', function($scope, $http) {
	$scope.currentUser = "";
	
  $scope.movie = $http.get("/movieinfo/" + localStorage.getItem("movieTitle")).success(function(data){
      $scope.movie = data;
  }).error(function(data){
        window.alert("hola");
  });
  
  
  $scope.movieReviews = $http.get('/moviereviews/' + localStorage.getItem("movieTitle")).success(function(data){
      $scope.movieReviews = data;
      console.log(JSON.toString($scope.movieReviews))
  });

  $scope.availableLists = $http.get('/usermovielistnames2' ).success(function(data){
      $scope.availableLists = data.data.lists;
      $scope.currentUser = data.currentuser;
    });

  $scope.isReviewer = function(reviewer){
    console.log(reviewer);
    console.log($scope.currentUser);
    if($scope.currentUser == reviewer) return true;
    else return false;
  };

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

  // gets the "full" star rating
  $scope.getMovieRating = function() {
    return new Array(parseInt($scope.movie.rating));
  };

  // gets "half" star rating
  $scope.getMovieHalfRating = function() {
    //substract integer part of the rating number, if result is not zero, it means there should be a half star
    var fract = $scope.movie.rating - parseInt($scope.movie.rating);

    if(fract != 0){
      //return array with only one space because only one half star will appear
      return new Array(1);
    }
    else {
      //return empty array because no half stars will appear
      return new Array(0);
    }
  };

  //
  // To get each reviewer's rating, we only need to set a bound; users cannot give half stars.
  //
  $scope.getReviewerRating = function(number) {
    return new Array(parseInt(number));
  };  

	//--------------------------
	//FUNSIONES PARA ANADIR MOVIE A LISTA
	//--------------------------
	$scope.data2send = {movieTitle: "",  title: "", description: "", listName: ""};
	$scope.addMovie2List = function(moviename, selectedlistname){ 
		$scope.data2send.movieTitle = moviename;
		$scope.data2send.listName = selectedlistname;
		$http.post('/addmovie2list', $scope.data2send).success(function(data){
			location.reload(true);
		}).error(function(data){
			window.alert("hola dentro del addMovie2List rn movieController");
		});
		
	};

  $scope.data2sendReview = {movieTitle: "",  title: "", review: "", rating: 0};
  $scope.addReview = function(moviename){ 
    $scope.data2sendReview.movieTitle = moviename;
    $http.post('/addReview', $scope.data2sendReview).success(function(data){
       location.reload(true);
    }).error(function(data){
      window.alert("hola review");
    });
  };
  
  //----------------
  // DELETE ITEM
  //----------------
  $scope.deleteReview = function(title){
	  console.log(title);
  	$http.delete('/deletereview/' + title)
  	.success(function(data){
  		console.log("Item deleted");
  		location.reload(true);
  	}).error(function(data, status){
  		/*
  		if(status==404){
  			$.jAlert({
  	              'title': data.title,
  	              'content': '<center>' + data.data + '</center>',
  	              'theme': 'red',
  	              'btns': { 'text': 'OK' },
  	              'showAnimation': 'zoomIn'
  	            });
  		}*/
  	});
  };

}]);