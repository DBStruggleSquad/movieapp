app.directive('followbutton', function() { 
  return { 
    restrict: 'E', 
    scope: {}, 
    templateUrl: 'followButton.html',
    link: function(scope, element, attrs) { 
  scope.buttonText = "+ Follow", 
  scope.installed = false, 

  scope.download = function() { 
    element.toggleClass('btn-active'); 
    if(scope.installed) { 
      scope.buttonText = "+ Follow"; 
      scope.installed = false; 
    } else { 
      scope.buttonText = "- Unfollow"; 
      scope.installed = true; 
    } 
  } 
}
  }; 
});