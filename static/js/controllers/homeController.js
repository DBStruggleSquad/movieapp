app.controller('home', ['$scope', '$http', function($scope,$http) {
	
  //------------------
  //	FAN CLUB
  //------------------
  $scope.fanclubActivities = $http.get('/myfanclubactivity').success(function(data){
	  $scope.fanclubActivities = data.data;
  });
	  

  $scope.eventActivities = $http.get('/myeventactivity').success(function(data){
	  $scope.eventActivities = data.data;
  })
	  
	  /*[{
    publisher: 'katrific',
    eventName: 'event-1',
    type: 'attending',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'amy',
    type: 'attending',
    eventName: 'event-2',
    pubdate: new Date('2015', '09', '22'),
  }];     */

$scope.tabs = [{
            title: 'Users',
            url: 'userfeed.tpl.html'
        }, {
            title: 'Fanclubs',
            url: 'fanclubfeed.tpl.html'
        }, {
            title: 'Events',
            url: 'eventfeed.tpl.html'
        }];



 $scope.activities = $http.get('/newsfeedactivity').success(function(data){
        $scope.userActivities = data.activity;
    }).error(function(data, status){
        window.alert(data + '\n' + status);
    });


    $scope.currentTab = 'userfeed.tpl.html'; //default opened tab
    $scope.currentInfo = 'Users'; //default info displayed


    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
        $scope.currentInfo = tab.title;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
}]);