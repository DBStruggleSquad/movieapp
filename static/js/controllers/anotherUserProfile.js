app.controller('anotherUserProfile', ['$scope', '$http', function($scope,$http) {
    $scope.userDetails = {
            name: 'katrific',
            rating: 5,
            quote: "i am groot.",
            activity: [
              {
                type: 'list',
                pubdate: new Date('2015', '09', '22'),
              },
              {
                type: 'post',
                pubdate: new Date('2015', '09', '19'),
              },
              {
                type: 'joined',
                pubdate: new Date('2015', '09', '15'),
              }
            ]
          };
    
    
    
	$scope.userName = localStorage.getItem('userName');

    $scope.activities = $http.get('/userprofileactivity/' + $scope.userName).success(function(data){
        $scope.activities = data.activity;
    }).error(function(data, status){
        window.alert(data + '\n' + status);
    });

    $scope.userLists = $http.get('/userlists/' + $scope.userName).success(function(data){
        $scope.userLists = data.lists;
    });

    $scope.userRank = $http.get('/userank/' + $scope.userName).success(function(data){
        if (data['rank']==="None") {$scope.userDetails.rating = "0";} else{$scope.userDetails.rating = data["rank"];};
        $scope.userDetails.name = data["user"];
        $scope.userDetails.quote = data["quote"];
        $scope.userDetails.picture = data["picture"];
        $scope.userDetails.email = data["email"];
    });

      $scope.userReview = $http.get('/userreviews/' + $scope.userName).success(function(data){
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

    $scope.userFollows = $http.get('/userfollows').success(function(data){
        $scope.userFollows = data['following'];
    });

    $scope.checkFollow = function() {
      for(var i=0; i < $scope.userFollows.length; i++){
        if($scope.userFollows[i].username == $scope.userName){
          $scope.userDetails.following = "Unfollow";
          return "Unfollow";
        }
      }
        $scope.userDetails.following = "Follow";
        return "Follow";
    };

    $scope.onClickOpt = function () {
    	console.log("entro")
        if ($scope.userDetails.following  === "Follow") 
            {
                $scope.addfollowuser();
            }
        else
          {
            $scope.unfollowuser();
          } ;
    };

    $scope.data2sendfollow = {user: "", email:""};
    $scope.addfollowuser = function(){ 
    	$scope.data2sendfollow.user = $scope.userDetails.name;
    	$scope.data2sendfollow.email = $scope.userDetails.email
	    $http.post('/followuser', $scope.data2sendfollow).success(function(data){
	      location.reload(true);
	    }).error(function(data){
	      window.alert("hola followuser");
	    });
    };

    $scope.data2sendfollow = {user: "", email:""};
    $scope.unfollowuser = function(){ 
      $scope.data2sendfollow.user = $scope.userDetails.name;
      $scope.data2sendfollow.email = $scope.userDetails.email
      console.log("va hacer el unfollow")
      $http.post('/unfollowuser', $scope.data2sendfollow).success(function(data){
    	  location.reload(true);
      }).error(function(data){
        window.alert("hola unfollow user");
      });
    };


}]);