app.controller('profile', ['$scope', function($scope) {
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
  }

$scope.userLists = {
    List_name: 'My top ten',
    movies: [ 
      { 
        title: 'Avatar',
        poster: '/static/img/movie-placeholder.svg',
      }, 
      { 
        title: 'Avengers',
        poster: '/static/img/movie-placeholder.svg',
      }, 
      { 
        title: 'Pokemon',
        poster: '/static/img/movie-placeholder.svg', 
      }
    ]
  }

  $scope.userReview = {
    movies: [ 
      { 
        Movie_title: 'Avatar',
        Review_title: 'Aww yeah',
        Rating: 3,
        review: 'text text text text text  \n text text text text text ',
      }, 
      { 
        Movie_title: 'Avengers',
        Review_title: 'it sucks',
        Rating: 2,
        review: '/static/img/movie-placeholder.svg',
      }, 
      { 
        Movie_title: 'Pokemon',
        Review_title: 'Changed my life',
        Rating: 10,
        review: '/static/img/movie-placeholder.svg', 
      }
    ]
  }

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
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}]);