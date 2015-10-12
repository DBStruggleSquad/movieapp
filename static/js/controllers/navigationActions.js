/**
 * Created by galarwen on 10-10-15.
 */

//------------------------------------------
//          Action for home button
//------------------------------------------
app.controller('homeNav', ['$scope','$location', function($scope, $location){
    $scope.goMyHome = function(){
        window.location.href = '/';
    };
    $scope.goMyProfile = function(){
        window.location.href = '/profile';
    };
    $scope.goEvent = function(){
        window.location.href =  '/events';
    };
    $scope.goMovies = function(){
        window.location.href =  '/movies';
    };
    $scope.goMyLists = function(){
        window.location.href =  '/my-lists';
    };
    $scope.goSettings = function(){
        window.location.href =  '/settings';
    };

}]);


app.controller('movieNav', ['$scope', function($scope){
    $scope.goToSelectedMovie = function(movieTitle){
      window.location.href = "/movie-profile"
    };
}]);


app.controller('userNav', ['$scope', function($scope){
    $scope.goToBusinessProfile = function(username){
        window.location.href = "/movie-profile"
    };
}]);