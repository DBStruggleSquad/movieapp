app.controller('myLists', ['$scope', '$http', function($scope, $http) {

  $scope.myLists = $http.get(window.location + '?mylist').success(function(data){

      $scope.myLists = data.mylist;
  });

  $scope.showModal = false;
  $scope.toggleModal = function(){
  	$scope.showModal = !$scope.showModal;
  }

  $scope.data2send = {username: "",  title: "", category: ""};
  $scope.addlist2user = function(Dausername){
    $scope.data2send.username = Dausername;
    window.alert(Dausername + "  " +$scope.data2send.title + "  "+$scope.data2send.category);
    $http.post('/addlist2user', $scope.data2send).success(function(data){
      window.alert($scope.data2send.listName + "   try  ")
    }).error(function(data){
      window.alert("Worst error code ever");
    });
    
  };

  //EJEMPLO PARA GUARDAR DATA ACCECIBLE A TODOS LOS CONTROLLERS Y PAGES
  //Para llamar funciones de los servicios:
  $scope.goToList = function(listName){
      localStorage.removeItem("userListName");
      localStorage.setItem("userListName", listName);

      //se deberia poner algun waiting para que la prox pag no abra antes de q el set se haga en localStorage
      window.location.href = "/list-page?" + listName;
  };

}]);

