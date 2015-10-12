app.controller('fanclubs', ['$scope', function($scope) {
  $scope.myFanclubs = [{
        name: 'Horror Movie Lovers Unite',
        type: 'Movie',
        creator: 'joe'
      }, 
      { 
        name: 'Pixar Fans',
        type: 'Film Studio',
        creator: 'amy'
      }
    ];

  $scope.publicFanclubs = [{
        name: 'Horror Movie Lovers Unite',
        type: 'Movie',
        creator: 'joe'
      }, 
      { 
        name: 'Pixar Fans',
        type: 'Film Studio',
        creator: 'amy'
      },
      { 
        name: 'S University Movie Club',
        type: 'Movie',
        creator: 'katrific'
      },
      { 
        name: 'Fanclub Name',
        type: 'Film Studio',
        creator: 'someuser'
      }
    ];

    $scope.showModal = false;
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
  }    
}]);