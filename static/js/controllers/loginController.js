app.controller('login', ['$scope', '$http', function($scope,$http) {

    //codigo para mensajes:
    $scope.passwordSrvMsg = "";
    $scope.resetPaswordMsg = function(){
    	$scope.passwordSrvMsg = "";
    };
    
	$scope.opts = [{
          title: 'Recover Password',
          url: 'recover.tpl.html'
        }, {
            title: 'Login',
            url: 'login.tpl.html'
        }, {
            title: 'Register',
            url: 'register.tpl.html'
        }];

    $scope.currentOpt = 'login.tpl.html'; //default opened tab

    $scope.onClickOpt = function (opt) {
        $scope.currentOpt = opt.url;
        if (opt.title  === "Login") 
            {
                $scope.userLogin();
            }
    };
    
    $scope.isActiveOpt = function(optUrl) {
        return optUrl == $scope.currentOpt;
    };



    //------------------------
    // ADD ACCOUNT
    //------------------------
    $scope.passwordMatch = "";
    $scope.verifyMatch = function(){
    	console.log("entro correctamente");
    	if($scope.data2sendregister.password1 == $scope.data2sendregister.password2){
    		$scope.passwordMatch = "";
    		console.log("pass match")
    	}else{
    		$scope.passwordMatch = "Passwords do not match";
    		console.log("se supone que cambie el mensjae")
    	}
    };
    $scope.data2sendregister = {username: "", email: "",  password1: "", password2: ""};
    $scope.addAccount = function(){ 
        $http.post('/addAccount', $scope.data2sendregister).success(function(data){
            window.location.href = '/profile?' + $scope.data2sendregister.username
        }).error(function(data, status){
        	if(status == 404){
        		 $.jAlert({
                     'title': 'Error',
                     'content': '<center>' + data.data + '</center>',
                     'theme': 'red',
                     'btns': { 'text': 'Close' },
                     'showAnimation': 'zoomIn'
                   });
        	}else if (status == 500) {
        		$.jAlert({
                    'title': 'Error',
                    'content': '<center> An account with that email already exists! </center>',
                    'theme': 'red',
                    'btns': { 'text': 'Close' },
                    'showAnimation': 'slideInUp'
                  });
			}
               
        });
    };

    //------------------------
    // LOG IN ACTION
    //------------------------
    $scope.data2sendlogin = {email: "",  password: ""};
    $scope.userLogin = function(){ 
    	$scope.passwordSrvMsg = "";
        $http.post('/userLogin', $scope.data2sendlogin).success(function(data){
            window.location.href = '/profile?' + $scope.data2sendlogin.email
        }).error(function(data){
        	 $scope.passwordSrvMsg = data.data;
        });
    };

    
    //------------------------
    // RECOVER PASSWORD
    //------------------------  
    $scope.emailForRecover = "";
    $scope.recoverPass = function(){
    	$http.post('/recoverpassword', $scope.emailForRecover).success(function(data){
    		$.jAlert({
    			'title': data.title,
                'content': '<center  style="word-wrap: break-word">' + data.data + '</center>',
                'theme': 'red',
                'btns': { 'text': 'Close' },
                'showAnimation': 'slideInUp'
    		})
    	}).error(function(data,status){
    		if(status == 404){
    			$.jAlert({
	    			'title': data.title,
	                'content': '<center>' + data.data + '</center>',
	                'theme': 'red',
	                'btns': { 'text': 'Close' },
	                'showAnimation': 'slideInUp'
    			})
    		}else{
    			$.jAlert({
	    			'title': 'Error',
	                'content': '<center> An error occured while trying to recover the password, plaese try again latter. </center>',
	                'theme': 'red',
	                'btns': { 'text': 'Close' },
	                'showAnimation': 'slideInUp'
    			})
    		}
    	})
    };


}]);