app.controller('anotherUserProfile', ['$scope', '$http', function($scope,$http) {
	$scope.userName = localStorage.getItem('userName');
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

    $scope.activities = $http.get('/userprofileactivity').success(function(data){
        $scope.activities = data.activity;
    }).error(function(data, status){
        window.alert(data + '\n' + status);
    });

    $scope.userLists = $http.get('/userlists').success(function(data){
        $scope.userLists = data.lists;
    });

    $scope.userRank = $http.get('/userank').success(function(data){
        $scope.userDetails.rating = data["rank"];
         $scope.userDetails.name = data["user"];
    });

      $scope.userReview = $http.get('/userreviews').success(function(data){
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
    $http.get('movie.json').success(function(data) {
        $scope.movies = data;});

}]);