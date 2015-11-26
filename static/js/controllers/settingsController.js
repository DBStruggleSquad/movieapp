app.controller('settings', ['$scope', 'Upload', '$timeout', '$http', function($scope, Upload, $timeout, $http) {
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

  var bucket = new AWS.S3({params: {Bucket: 'filmshak'}});
  bucket.listObjects(function(err, data){
	  if(err){
		  alert("Could not load object");
	  }else{
		  var txt = " ";
		  for (var i = 0; i < data.Contents.length; i++) {
		        txt += '\n' + data.Contents[i].Key;
		  }
		  alert("Hizo load con existo data: " + txt);
	  }
  });
  //----------------------------
  // FILESSSS 
  //----------------------------
  console.log("entrando a la seccion de upload img");
  AWS.config. update({accessKeyId: "AKIAJMYLTY2I4EHYNUVA", secretAccessKey: "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"});
  AWS.config.region = 'us-east-1';

  
  $scope.uploadFiles = function(file) {
	  get_signed_request(file);
	  /*
	  console.log(file)
	  console.log($scope.profilePic2)
	  console.log(file.type)
	  console.log(file['type'])
	  console.log("entro")
	  $http.post('/uploadprofilepicture', $scope.profilePic2).success(function(data){
		  console.log(data.data);
	  }).error(function(data){
		  
	  });
	  /*
	    file.upload = Upload.upload({
	        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
	        data: {file: file, username: $scope.username},
	      });

	      file.upload.then(function (response) {
	        $timeout(function () {
	          file.result = response.data;
	        });
	      }, function (response) {
	        if (response.status > 0)
	          $scope.errorMsg = response.status + ': ' + response.data;
	      }, function (evt) {
	        // Math.min is to fix IE which reports 200% sometimes
	        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	      });*/
	  /*
	  $http.get('/signed_urls/' + file.name).success(function(data){
		  
		  Upload.upload({
			    url: 'https://filmshack.s3.amazonaws.com', //S3 upload url including bucket name
			    method: 'POST',
			    data: {
			        key: data.key, // the key to store the file on S3, could be file name or customized
			        AWSAccessKeyId: "AKIAJMYLTY2I4EHYNUVA",
			        acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
			        policy: data.policy, // base64-encoded json policy (see article below)
			        signature: data.signature, // base64-encoded signature based on policy string (see article below)
			        "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
			        filename: file.name, // this is needed for Flash polyfill IE8-9
			        file: file
			    }
			});
	  }).error(function(data){
		  
	  })*/

  }
  

  
  //ng-change="{{userDetails.picture}} = files[0].name.toString()"

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