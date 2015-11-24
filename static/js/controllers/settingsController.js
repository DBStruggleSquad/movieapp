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

  $scope.showBusinessModal;

  $scope.toggleBusinessModal = function(a){
    $scope.showBusinessModal = !$scope.showBusinessModal;
    $scope.accType = "Business";
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

  $scope.onClickOpt = function (opt) {
        $scope.currentOpt = opt.url;
        if (opt  === "Names") 
            {
                $scope.changeUser();
            }
        else if (opt  === "Quote") 
        {
          $scope.changeQuote();
        } 
        else if (opt === "Business"){
          $scope.createBusiness();
        }
        else if (opt  === "Email") 
        {
          $scope.changeEmail();
        } 
        else if (opt  === "Password") 
          {
            $scope.changePass()
          } ;
    };

/*  $scope.getBusiness = $http.get('/myuserank').success(function(data){
      $scope.userDetails.rating = data["rank"];
      $scope.userDetails.Names = data["user"];
      $scope.userDetails.Quote = data["quote"];
      $scope.userDetails.picture = data["picture"];
      $scope.userDetails.Email = data["email"];
    });   */

  //Muestra add post si eres el dueno
    $scope.getBusiness = $http.get('/ownsbusiness/').success(function(data){
/*    console.log(data.data);
      $scope.getBusiness = (data.data == "true");
      console.log($scope.checkOwner)*/
      if(data != "false") {
        $scope.businessDetails.name = data.username;
        $scope.businessDetails.quote = data.quote;
        $scope.getBusiness = true;
      }
      else {
        $scope.getBusiness = false;
      }
    });

  $scope.data2send = {gvar: ""};
    $scope.changeEmail = function(){
      $http.post('/changeEmail', $scope.data2send).success(function(data){
        location.reload(true)
      }).error(function(data){
        window.alert("Email Exists");
      });
    };

    $scope.changeQuote = function(){
      $http.post('/changequote', $scope.data2send).success(function(data){
        location.reload(true)
      }).error(function(data){
        window.alert("Worst error code ever in post");
      });
    };

    $scope.changePass = function(){
      $http.post('/changepass', $scope.data2send).success(function(data){
        location.reload(true)
      }).error(function(data){
        window.alert("Worst error code ever in post");
      });
    };

    $scope.changeUser = function(){
      $http.post('/changeuser', $scope.data2send).success(function(data){
        location.reload(true)
      }).error(function(data){
        window.alert("User Exists");
      });
    };

}]);