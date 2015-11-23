app.controller('settings', ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout,$http) {
  $scope.profilePic = '';
  $scope.userDetails = {
    Names: '',
    rating: "",
    Quote: "",
    picture: "",
    Email: "",
  };
  $scope.userRank = $http.get('/myuserank').success(function(data){
      $scope.userDetails.rating = data["rank"];
      $scope.userDetails.Names = data["user"];
      $scope.userDetails.Quote = data["quote"];
      $scope.userDetails.picture = data["picture"];
      $scope.userDetails.Email = data["email"];
    });

  $scope.setProfilePic = function(p1, image){
    p1 = image;
  };
  $scope.accOptions= [ 
      { 
        type: 'Username',
        current: $scope.userDetails.names,
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
      },
      {
        type: 'Log Out',
        current: "idk"
      }
    ];


  $scope.profileOptions = {
    profOptions: [ 
      { 
        type: 'Profile Picture',
        current: 'static/img/profile-picture-placeholder.svg',
      },
      {
        type: 'Quote',
        current: 'i am groot',
      },
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
    if (a === "Names") {$scope.accType = "Username";} else{$scope.accType = a;};
    if (a == 'Password') {$scope.currentOpt = '**********'} else{$scope.currentOpt = $scope.userDetails[a];};
    
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