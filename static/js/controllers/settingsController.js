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

}]);