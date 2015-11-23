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
        $scope.userDetails.image = data["image"];
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
        $scope.userFollows = data;
        window.alert(data);
    });

/*    $scope.checkFollow = function() {
      for(int i=0; i < userFollows.length; i++){
        if(userFollows[i].username === userName)
          return "Unfollow";
      }
      else
        return "Follow";
    };*/

    $scope.data2sendfollow = {user: "", email:""};
  $scope.addfollowuser = function(user){ 
    $scope.data2sendfollow.user = user;
    $scope.data2sendfollow.email = $scope.userDetails.email
    $http.post('/followuser', $scope.data2sendfollow).success(function(data){
      window.alert("worked")

    }).error(function(data){
      window.alert("hola followuser");
    });
  };


}]);