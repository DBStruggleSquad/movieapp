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
        window.location.href = '/';
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

}])