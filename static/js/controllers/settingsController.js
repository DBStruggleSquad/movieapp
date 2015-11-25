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

    //-----------------------------
    // CODIGO PARA BUSINESS
    //-----------------------------
    $scope.hasbusiness = false;
    $scope.nothasbusiness = !$scope.hasbusiness
    $scope.bussName = "";
    $scope.bussQuote = "";

  //Muestra add post si eres el dueno
    $scope.setHasBuss = $http.get('/ownsbusiness').success(function(data){
      $scope.hasbusiness = data.data;
      $scope.nothasbusiness = !$scope.hasbusiness;
      $scope.bussName = data.bussName;
      $scope.bussQuote = data.bussQuote;
      console.log(data.bussQuote)
    });  
  
  //----------------------------
  // MODAL	
  //----------------------------
  $scope.showModal = false;
  $scope.accType = 'Username';
  $scope.currentOpt = 'Unknown';
  $scope.accTBype= "";
  $scope.currentBussOpt = "";

  $scope.toggleModal = function(a){
    $scope.showModal = !$scope.showModal;
    if (a === "Names") {$scope.accType = "Username";} 
    else if (a == 'Password') {$scope.currentOpt = '**********'} /*else{$scope.currentOpt = $scope.userDetails[a];};*/
    else if (a == 'Business Username') {$scope.accType = "Business Username"; $scope.currentOpt = $scope.bussName;}
    else if (a == 'Business Quote') {$scope.accType = "Business Quote"; $scope.currentOpt = $scope.bussQuote;}
    else{$scope.accType = a;};
  }

  $scope.showBussSetModal = false;
  $scope.toggleBussSet = function(b){
    $scope.showBussSetModal = !$scope.showBussSetModal;
    if(b == "Business Username") {$scope.accBType = b; $scope.currentOpt = $scope.bussName;}
    else if (b == "Business Quote") {$scope.accTBype = b; $scope.currentOpt = $scope.bussQuote;}    
  }
  
  $scope.showBusinessModal = false;
  $scope.toggleBusinessModal = function(a){
    $scope.showBusinessModal = !$scope.showBusinessModal;
    $scope.accType = "Business";
  }

  
  //----------------------------
  // FILESSSS 
  //----------------------------
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
        else if (opt === "Business Quote"){
            $scope.changebQuote($scope.bussName);
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

    //-----------------------------
    // CHANGE EMAIL
    //-----------------------------

    $scope.data2send = {gvar: "", bname: $scope.bussName};
    $scope.data2sendb = {quote: "", bname: $scope.bussName};
    $scope.changebQuote = function(dude){
      $scope.data2send.bname = dude;
      $http.post('/changebussquote', $scope.data2send).success(function(data){
        location.reload(true)
      }).error(function(data){
        window.alert("Worst error code ever in post");
      });
    };


  
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