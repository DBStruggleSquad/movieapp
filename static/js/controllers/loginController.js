app.controller('login', ['$scope', '$http', function($scope,$http) {

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

    $scope.data2sendregister = {username: "",email: "",  password1: "", password2: ""};
    $scope.addAccount = function(){ 
        $http.post('/addAccount', $scope.data2sendregister).success(function(data){
            window.location.href = '/profile' + $scope.data2sendregister.email
        }).error(function(data){
            window.alert("This blew up");
        });
    };

    $scope.data2sendlogin = {email: "",  password: ""};
    $scope.userLogin = function(){ 
        $http.post('/userLogin', $scope.data2sendlogin).success(function(data){
            window.location.href = '/profile?' + $scope.data2sendlogin.email
        }).error(function(data){
            window.alert("This blew up in login");
        });
    };

}]);