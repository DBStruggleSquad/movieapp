app.controller('list', ['$scope', '$http', function($scope, $http) {
  
  $scope.list;
  $scope.localListName;

  //Method for go to a specific list page
  $scope.goToList = function(listName){

    this.localListName = listName;


    $http.get("listinfo/" + listName).success(function(data){
      window.alert($scope.localListName + " spuat" + data.listinfo);
      $scope.list = data.listinfo;

    });
    window.location.href = "/list-page"

  };


  //functions
  $scope.getListData = function(listName){
    $http.get("listinfo/" + listName).success(function(data){
      window.alert(data);
      $scope.list = data;
    }).error(function(data, status){
      window.alert("List Info no se accedio\n" + status);
    });
  };

}]);