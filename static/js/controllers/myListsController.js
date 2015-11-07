app.controller('myLists', ['$scope', '$http', function($scope, $http) {

  $scope.myLists = $http.get(window.location + '?mylist').success(function(data){

      $scope.myLists = data.mylist;
  });

  $scope.showModal = false;
  $scope.toggleModal = function(){
  	$scope.showModal = !$scope.showModal;
  }
  //Para llamar funciones de los servicios:
  $scope.goToList = function(listName){
      localStorage.removeItem("userListName");
      localStorage.setItem("userListName", listName);

      //se deberia poner algun waiting para que la prox pag no abra antes de q el set se haga en localStorage
      window.location.href = "/list-page?" + listName;
  };

}]);

