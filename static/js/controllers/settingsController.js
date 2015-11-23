app.controller('settings', ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout,$http) {
  $scope.profilePic = '';
  $scope.userDetails = {
    name: '',
    rating: 0,
    quote: "",
    picture: "",
    email: "",
  };
  $scope.userRank = $http.get('/myuserank').success(function(data){
      $scope.userDetails.rating = data["rank"];
      $scope.userDetails.name = data["user"];
      $scope.userDetails.quote = data["quote"];
      $scope.userDetails.picture = data["picture"];
      $scope.userDetails.email = data["email"];
    });

  $scope.setProfilePic = function(p1, image){
    p1 = image;
  };
  $scope.accountOptions = {
    accOptions: [ 
      { 
        type: 'Username',
        current: $scope.userDetails.name,
      }, 
      { 
        type: 'Email',
        current: $scope.userDetails.email,
      }, 
      { 
        type: 'Password',
        current: '********', 
      },
      {
        type:"Rank",
        current: $scope.userDetails.rating,
      },
      {
        type: "Quote",
        current: $scope.userDetails.quote,
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