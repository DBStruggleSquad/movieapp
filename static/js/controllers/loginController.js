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

    $http.get('movie.json').success(function(data) {
        $scope.movies = data;});

    //------------------------
    // ADD ACCOUNT
    //------------------------
    $scope.data2sendregister = {username: "",email: "",  password1: "", password2: ""};
    $scope.addAccount = function(){ 
    	console.log("entro al add")
        $http.post('/addAccount', $scope.data2sendregister).success(function(data){
            window.location.href = '/profile' + $scope.data2sendregister.email
        }).error(function(data){
        	console.log("correctaamente exploto");
        	console.log("se supone q el dialog saliera")
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
        	 $scope.passwordSrvMsg = "Password or email incorrect";
        });
    };
    


}]);