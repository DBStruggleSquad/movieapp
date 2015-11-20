app.controller('movies', ['$scope', '$http', function($scope, $http) {

    /*$scope.genreList = [
        {name: 'Action', movies: [{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'}, {name: 'Movie-2', poster: '/static/img/movie-placeholder.svg'}, {name: 'Movie-3', poster: '/static/img/movie-placeholder.svg'}]},
        {name: 'Drama', movies: [{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'}, {name: 'Movie-2', poster: '/static/img/movie-placeholder.svg'}, {name: 'Movie-3', poster: '/static/img/movie-placeholder.svg'}]},
        {name: 'History', movies: [{name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'}, {name: 'Movie-2', poster: '/static/img/movie-placeholder.svg'}, {name: 'Movie-3', poster: '/static/img/movie-placeholder.svg'}]}
    ]*/

    $scope.mostReviewedMovies = $http.get(window.location + '?mostreviewed').success(function(data, status, header){
        $scope.mostReviewedMovies = data.movies;
    }).error(function(data, status, header){
        window.alert(status + "\n" + header);
    });

    $scope.genreList = $http.get(window.location + '?bygender').success(function(data){
        $scope.genreList = data.genrelist;
    }).error(function(data, status, header){
        windows.alert(status + "\n" + header)
    });

    $scope.topRated = $http.get(window.location + '?toprated').success(function(data){
        $scope.topRated = data.toprated;
    })
    /*$scope.topRated = [
        {name: 'Movie-1', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-2', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-3', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-4', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-5', poster: '/static/img/movie-placeholder.svg'}
    ];*/
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
    $scope.goToSelectedMovie = function(movieTitle){
        localStorage.removeItem("movieTitle");
        localStorage.setItem("movieTitle", movieTitle);
        window.location.href = "/movie-profile?" + movieTitle;
    };
    //===========================================
    //		CODIGO PARA SEARCH
    //===========================================
    $scope.searchTxtMessage = "Search...";
    $scope.searchMovies = function(txtForSearch){
    	if ( txtForSearch){
    		localStorage.removeItem("movieSrchTxt");
    		localStorage.setItem("movieSrchTxt", txtForSearch);
    		window.location.href = "/search-results?" + txtForSearch;
    		//proximos codigos en searchResultController dado que se hace rendering de search-result.html
    		
    	}else{
    		$scope.searchTxtMessage = "Please insert text for search..."
        	window.alert("No se ha ingresado texto para el search, intente de nuevo...");
    	}
    	
    };

}]);

