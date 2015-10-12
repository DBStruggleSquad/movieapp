app.controller('list', ['$scope', function($scope) {
  
  $scope.list = {
    name: 'My Top Ten',
    movies: [{
    title: 'Avatar',
    year: '2009',
  }, {
    title: 'Avengers',
    year: 'some year',
  }, {
    title: 'Some movie',
    year: 'some year',
  }]
}

}]);