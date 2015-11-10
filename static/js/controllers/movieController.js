app.controller('profile', ['$scope', '$http', function($scope, $http) {
  $scope.movie = $http.get("/movieinfo/" + localStorage.getItem("movieTitle")).success(function(data){
  	$scope.movie = data;
  }).error(function(data){
  		window.alert("hola");
  });


  $scope.movieReviews = $http.get('/moviereviews/' + localStorage.getItem("movieTitle")).success(function(data){
  	$scope.movieReviews = data;
  });

$scope.availableLists = ['Worst', 'My Top 10', 'Hi'];

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
    };
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    };

    $scope.showModal = false;

    $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
  };        

}]);