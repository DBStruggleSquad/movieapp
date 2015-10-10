app.directive('activity-post', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      obj: '=' 
    }, 
    templateUrl: '/static/js/directives/activityPost.html' 
  }; 
});