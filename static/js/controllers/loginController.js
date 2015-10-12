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
    };
    
    $scope.isActiveOpt = function(optUrl) {
        return optUrl == $scope.currentOpt;
    };

    $http.get('movie.json').success(function(data) {
        $scope.movies = data;});

}]);