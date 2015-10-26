app.controller('myLists', ['$scope', '$http', function($scope, $http) {
  $scope.myLists = $http.get(window.location + '?mylist').success(function(data){

      $scope.myLists = data.mylist;
  });

  $scope.showModal = false;
  $scope.toggleModal = function(){
  	$scope.showModal = !$scope.showModal;
  }
}]);