app.controller('settings', ['$scope', function($scope) {
  $scope.accountOptions = {
    accOptions: [ 
      { 
        type: 'Username',
        current: 'katrific',
      }, 
      { 
        type: 'Email',
        current: 'kat@domain.com',
      }, 
      { 
        type: 'Password',
        current: '********', 
      }
    ]
  }

  $scope.profileOptions = {
    profOptions: [ 
      { 
        type: 'Profile Picture',
        current: 'static/img/profile-picture-placeholder.svg',
      }
    ]
  }

  $scope.toggleActive = function(s){
    s.active = !s.active;
  };

  $scope.showModal = false;
  $scope.accType = 'Username';
  $scope.currentOpt = 'Unknown';
  $scope.toggleModal = function(a){
    $scope.showModal = !$scope.showModal;
    $scope.accType = a.type;
    if (a.type == 'Password') {$scope.currentOpt = '**********'} else{$scope.currentOpt = a.current;};
    
  } 

}]);