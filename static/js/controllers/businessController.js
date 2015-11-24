app.controller('business', ['$scope', '$http', function($scope, $http) {
  
	$scope.tryp = $http.get('/mybusinessinfo/Idk').success(function(data){
		//data = {'businessinfo': {'quote': 'idk why we need this', 'name': 'Idk', 'email': 'antoine.cotto@upr.edu'}, 'businessactivity': {'data': [{'text': 'idk why we need this', 'pubdate': '2015-11-24', 'title': 'First'}]}}
		$scope.tryp = data.businessinfo
		$scope.tryp['activity'] = data.businessactivity
    //window.alert($scope.tryp.activity.data[0].text);
		//tryp = {"email":"antoine.cotto@upr.edu","name":"Idk","quote":"idk why we need this","activity":{"data":[{"pubdate":"2015-11-24","text":"idk why we need this","title":"First"}]}}
		console.log(JSON.stringify($scope.tryp))
	}).error(function(data, status){
		console.log("Problemas getting la info de business")
		console.log(data);
		console.log(status);
	});

  $scope.checkOwner = function(email){
    window.alert(email);
    if(email == $scope.tryp.email){
      return true;
    }
    else {
      return false;
    }
  };
	
	//
$scope.userDetails = {
    name: 'dreamworks',
    rating: 5,
    activity: [ 
      { 
        type: 'list',
        pubdate: new Date('2015', '09', '22'),
      }, 
      { 
        type: 'post',
        pubdate: new Date('2015', '09', '19'),
      }, 
      { 
        type: 'joined',
        pubdate: new Date('2015', '09', '15'), 
      }
    ]
  }

 $scope.userEvents = [{
      name: 'Tomorrow Premiere',
      date: new Date('2015', '11', '22'),
      host: 'dreamworks',
    }, {
      name: 'Something Premiere',
      date: new Date('2015', '12', '22'),
      host: 'dreamworks',
    }];

$scope.tabs = [{
            title: 'Activity',
            url: 'activity.tpl.html'
        }];

    $scope.currentTab = 'activity.tpl.html'; //default opened tab

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}]);

    //--------------------
    //  POST CODE
    //--------------------
    $scope.data2sendPost = {title: "", post: ""};
    $scope.adduserpost = function(){
      $http.post('/adduserpost', $scope.data2sendPost).success(function(data){
        location.reload(true)
      }).error(function(data, status){
        if(status == 404){
              $.jAlert({
                    'title': data.title,
                    'content': data.data,
                    'theme': 'black',
                    'btns': { 'text': 'Close' },
                    'showAnimation': 'zoomIn'
                  });
        }else {
          $.jAlert({
                    'title': "Connection Error",
                    'content': "Your request can not be execute, please try again later.",
                    'theme': 'black',
                    'btns': { 'text': 'Close' },
                    'showAnimation': 'zoomIn'
                  });
      }
      });

    };