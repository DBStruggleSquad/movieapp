app.controller('movies', ['$scope', function($scope) {
  $scope.movies = [{
        name: 'Movie-1',
        genre: 'comedy',
        img: 'static/img/movie-placeholder.svg'
      }, { 
        name: 'Movie-2',
        genre: 'horror',
        img: 'static/img/movie-placeholder.svg'
      }, { 
        name: 'Movie-3',
        genre: 'suspense',
        img: 'static/img/movie-placeholder.svg'
      }, { 
        name: 'Movie-4',
        genre: 'drama',
        img: 'static/img/movie-placeholder.svg'
      }, { 
        name: 'Movie-5',
        genre: 'comedy',
        img: 'static/img/movie-placeholder.svg'
      }, { 
        name: 'Movie-6',
        genre: 'drama',
        img: 'static/img/movie-placeholder.svg'
      }, { 
        name: 'Movie-7',
        genre: 'history',
        img: 'static/img/movie-placeholder.svg'
      }];

$scope.tabs = [{
            title: 'Most Reviewed',
            url: 'mostreviewed.tpl.html'
        }, {
            title: 'By Genre',
            url: 'bygenre.tpl.html'
        }, {
            title: 'Top Rated',
            url: 'toprated.tpl.html'
    }];

    $scope.currentTab = 'mostreviewed.tpl.html'; //default opened tab

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}]);