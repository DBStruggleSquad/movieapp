app.directive('activity-post', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      obj: '=' 
    }, 
    templateUrl: 'js/directives/activityPost.html' 
  }; 
});