app.controller('profile', ['$scope', function($scope) {
  $scope.userDetails = {
    name: 'katrific',
    rating: 2,
    quote: "i am groot.",
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

$scope.tabs = [{
            title: 'Activity',
            url: 'activity.tpl.html'
        }, {
            title: 'Lists',
            url: 'lists.tpl.html'
        }, {
            title: 'Reviews',
            url: 'reviews.tpl.html'
    }];

    $scope.currentTab = 'activity.tpl.html'; //default opened tab

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}]);