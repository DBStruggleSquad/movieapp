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

app.controller('logoutNav', ['$scope', '$http', function($scope,$http){
    $scope.data2send = {gvar: ""};
    $scope.logout = function(){
      $http.post('/userLogout', $scope.data2send).success(function(data){
        window.location.href =  '/login';
      }).error(function(data){
        window.alert("IDK");
      });
    };
    $scope.goToSelectedMovie = function(movieTitle){
        localStorage.removeItem("movieTitle");
        localStorage.setItem("movieTitle", movieTitle);
        window.location.href = "/movie-profile?" + movieTitle;
    };
}]);



app.controller('movieNav', ['$scope', function($scope){
	$scope.goToSelectedMovie = function(movieTitle){
		console.log("va a ir a la siguiente mocie: " + movieTitle)
        localStorage.removeItem("movieTitle");
        localStorage.setItem("movieTitle", movieTitle);
        window.location.href = "/movie-profile?" + movieTitle;
    };
}]);

app.controller('userNav', ['$scope', function($scope){
    $scope.goToBusinessProfile = function(username){
        window.location.href = "/business-profile";
    };
    $scope.goToUserProfile = function(username){
        window.location.href = "/profile?" + username;
    };
    $scope.goToUserHome = function(){
        window.location.href = "/users";
    };
    $scope.goToAnothersUserProfile = function(username){
    	console.log(username)
    	localStorage.removeItem("userName");
        localStorage.setItem("userName", username);
    	window.location.href = "/userprofile?" + username;
    }
}]);



app.controller('fanClubNav', ['$scope', function($scope){
    $scope.goToFCHome = function(){
        window.location.href = "/fanclubs"
    };
    $scope.goToFCPage = function(fanclubname){
    	localStorage.removeItem("fanClubName");
        localStorage.setItem("fanClubName", fanclubname);
        window.location.href = "/fanclub-page?" + fanclubname
    }

}]);

app.controller('eventsNav', ['$scope',  function($scope){
    $scope.goToEvents = function(){
        window.location.href = "/events"
    };
    
    $scope.goToEventPage = function(eventName){
    	localStorage.removeItem("eventName");
        localStorage.setItem("eventName", eventName);
        window.location.href = "/event-page?" + eventName
    }

}]);

app.controller('listNav', ['$scope', '$rootScope', function($scope, $rootScope){
	  $scope.goToList = function(listName){
	      localStorage.removeItem("userListName");
	      localStorage.setItem("userListName", listName);

	      //se deberia poner algun waiting para que la prox pag no abra antes de q el set se haga en localStorage
	      window.location.href = "/list-page?" + listName;
	  };
}]);


app.controller('businessNav', ['$scope', '$rootScope', function($scope, $rootScope){
	  $scope.goToBusinessPage = function(businessname){
	      localStorage.removeItem("businessName");
	      localStorage.setItem("businessName", businessname);

	      //se deberia poner algun waiting para que la prox pag no abra antes de q el set se haga en localStorage
	      window.location.href = "/business-profile?" + businessname;
	  };
}]);

