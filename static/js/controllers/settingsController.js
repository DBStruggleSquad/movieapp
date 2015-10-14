app.controller('settings', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout) {
  $scope.profilePic = '';

  $scope.setProfilePic = function(p1, image){
    p1 = image;
  };
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
    $scope.title = a.type;
    if (a.type == 'Password') {$scope.currentOpt = '**********'} else{$scope.currentOpt = a.current;};
    
  }

  $scope.files;
  $scope.uploadFiles = function (files) {
    $scope.files = files;
    if (files && files.length) {
      Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {
          files: files
        }
      }).then(function (response) {
        $timeout(function () {
          $scope.result = response.data;
        });
      }, function (response) {
        if (response.status > 0) {
          $scope.errorMsg = response.status + ': ' + response.data;
        }
      }, function (evt) {
        $scope.progress =
            Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }

  };
}]);