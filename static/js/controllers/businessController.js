app.controller('business', ['$scope', function($scope) {
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
        }, {
            title: 'Events',
            url: 'events.tpl.html'
        }];

    $scope.currentTab = 'activity.tpl.html'; //default opened tab

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}]);