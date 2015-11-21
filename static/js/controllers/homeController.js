app.controller('home', ['$scope', '$http', function($scope,$http) {
	
  $scope.userActivities = [{
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'katrific',
    type: 'list',
    pubdate: new Date('2015', '09', '22'),
  }]; 

  //------------------
  //	FAN CLUB
  //------------------
  $scope.fanclubActivities = [{
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'Pixar Lovers Unite',
    type: 'post',
    pubdate: new Date('2015', '09', '22'),
  }];   

  $scope.eventActivities = [{
    publisher: 'katrific',
    eventName: 'event-1',
    type: 'attending',
    pubdate: new Date('2015', '09', '22'),
  }, {
    publisher: 'amy',
    type: 'attending',
    eventName: 'event-2',
    pubdate: new Date('2015', '09', '22'),
  }];     

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