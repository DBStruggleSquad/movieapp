app.controller('profile', ['$scope', '$http', function($scope,$http) {
	
  $scope.userDetails = {
    name: '',
    rating: 0,
    quote: ""
  };

  $scope.activities = $http.get('/myuserprofileactivity').success(function(data){
    $scope.activities = data.activity;
  }).error(function(data, status){
    window.alert(data + '\n' + status);
  });

  $scope.userLists = $http.get('/myuserlists').success(function(data){
    $scope.userLists = data.lists;
  });

  $scope.userRank = $http.get('/myuserank').success(function(data){
    $scope.userDetails.rating = data["rank"];
    $scope.userDetails.name = data["user"];
    $scope.userDetails.quote = data["quote"];
    $scope.userDetails.picture = data["picture"];
  });

  $scope.userReview = $http.get('/myuserreviews').success(function(data){
    $scope.userReview = data.reviews;
  }).error(function(data, status){
    window.alert('userreview' + data + status);
  });

  //
  // To get each reviewer's rating, we only need to set a bound; users cannot give half stars.
  //
  $scope.getReviewerRating = function(number) {
    return new Array(parseInt(number));
  }; 

  $scope.getUserRating = function() {
    return new Array(parseInt($scope.userDetails.rating));
  };     

  $scope.tabs = [{
    title: 'Activity',
    url: 'activity.tpl.html'
  }, {
    title: 'Lists',
    url: 'lists.tpl.html'
  }, {
    title: 'Reviews',
    url: 'reviews.tpl.html'
  }];

    $scope.currentTab = 'activity.tpl.html'; //default opened tab

    $scope.onClickTab = function (tab) {
      $scope.currentTab = tab.url;
    };
    
    $scope.isActiveTab = function(tabUrl) {
      return tabUrl == $scope.currentTab;
    };


    //--------------------
    //	POST CODE
    //--------------------
    $scope.data2sendPost = {title: "", post: ""};
    $scope.adduserpost = function(){
    	$http.post('/adduserpost', $scope.data2sendPost).success(function(data){
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