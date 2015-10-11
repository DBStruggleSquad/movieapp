app.controller('myLists', ['$scope', function($scope) {
  $scope.myLists = [{
        name: 'My Top Ten'
      }, 
      { 
        name: 'Must-Watch'
      }
    ];

  $scope.showModal = false;
  $scope.toggleModal = function(){
  	$scope.showModal = !$scope.showModal;
  }
}]);