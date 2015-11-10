/**
 * Created by galarwen on 10-10-15.
 */

//------------------------------------------
//          Action for home button
//------------------------------------------
app.controller('homeNav', ['$scope','$location', function($scope, $location){
    $scope.goMyHome = function(){
        window.location.href = '/home';
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
    $scope.verifyLocation = function(location1){
        if( window.location.pathname == location1){
           return true;
        }else{
           return false;
        }
    };

}]);

//------------------------------------------
//          MOVIE NAV
//------------------------------------------
app.controller('movieNav', ['$scope', function($scope){
    $scope.goToSelectedMovie = function(movieTitle){
        localStorage.removeItem("movieTitle");
        localStorage.setItem("movieTitle", movieTitle);
        window.location.href = "/movie-profile?" + movieTitle;
    };
}]);


app.controller('userNav', ['$scope', function($scope){
    $scope.goToBusinessProfile = function(username){
        window.location.href = "/business-profile"
    };
    $scope.goToUserProfile = function(username){
        window.location.href = "/profile"
    }
}]);


app.controller('fanClubNav', ['$scope', function($scope){
    $scope.goToFCHome = function(){
        window.location.href = "/fanclubs"
    };
    $scope.goToFCPage = function(fanclubname){
        window.location.href = "/fanclub-page"
    }

}]);

app.controller('eventsNav', ['$scope', function($scope){
    $scope.goToEvents = function(){
        window.location.href = "/events"
    };
    $scope.goToEventPage = function(eventName){
        window.location.href = "/event-page"
    }

}]);

app.controller('listNav', ['$scope', '$rootScope', function($scope, $rootScope){
    $scope.goToList = function(name){
        $rootScope.$emit("listCtrlMethods", name);
        window.location.href = "/list-page"
    };


}]);