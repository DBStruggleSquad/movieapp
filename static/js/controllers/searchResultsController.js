app.controller('results', ['$scope', '$http', function($scope, $http) {

    $scope.searchTester = [
        {name: 'Movie-1', year: '1999', genre: 'comedy', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-1', year: '2001', genre: 'comedy', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-2', year: '2003', genre: 'romance', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-3', year: '2005', genre: 'action', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-3', year: '2008', genre: 'action', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-4', year: '2011', genre: 'horror', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'},
        {name: 'Movie-5', year: '2014', genre: 'sci-fi', synopsis: 'textextextextextext', poster: '/static/img/movie-placeholder.svg'}
    ];

}]);