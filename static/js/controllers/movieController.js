app.controller('profile', ['$scope', function($scope) {
  $scope.movie = {
    name: 'Avatar',
    year: '2009',
    genres: ['action', 'adventure', 'fantasy'],
    poster: '/static/img/movie-placeholder.svg',
    rating: '5',
    synopsis: 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.',
    cast: [{
      name: 'fulana',
      img: 'static/img/profile-picture-placeholder.svg',
      }, {
        name: 'mengana',
        img: 'static/img/profile-picture-placeholder.svg',
      }, {
        name: 'mengana',
        img: 'static/img/profile-picture-placeholder.svg',
      }, {
        name: 'dude',
        img: 'static/img/profile-picture-placeholder.svg',
      }]
  }

  $scope.movieReviews = {
    movies: [ 
      { 
        reviewer: 'katrific',
        Movie_title: 'Avatar',
        Review_title: 'Aww yeah',
        Rating: 3,
        review: 'text text text text text text text text text text ',
      }, 
      { 
        reviewer: 'samy',
        Movie_title: 'Avatar',
        Review_title: 'it sucks',
        Rating: 2,
        review: 'no',
      }, 
      { 
        reviewer: 'jil',
        Movie_title: 'Avatar',
        Review_title: 'Changed my life',
        Rating: 5,
        review: 'amaaaaaaaaaazingggggggggggggggg', 
      }
    ]
  }

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
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}]);