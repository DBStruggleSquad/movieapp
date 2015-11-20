app.controller('results', ['$scope', '$http', function($scope, $http) {

	$scope.movieSrchTxt = localStorage.getItem("movieSrchTxt");
	/*
    $scope.movieSrchResult = $http.get('/searchMovie/inc').success(function(data){
    	$scope.movieSrchResult = data;
    	window.alert("salio")
    }.error(function(data){
    	window.alert("no se logro conectar para hacer el search")
    });
    */
	
	  $scope.searchTester = $http.get('/searchMovie/' + $scope.movieSrchTxt).success(function(data){
	      $scope.searchTester = data.data;
	  });
    
	  /*
    $scope.searchTester = [
        {name: 'Movie-1', year: '1999', genre: 'comedy', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-1', year: '2001', genre: 'comedy', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-2', year: '2003', genre: 'romance', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-3', year: '2005', genre: 'action', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-3', year: '2008', genre: 'action', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-4', year: '2011', genre: 'horror', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-5', year: '2014', genre: 'sci-fi', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'}
    ];
    */


}]);