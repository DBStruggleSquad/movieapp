app.controller('myLists', ['$scope', '$http', function($scope, $http) {

  $scope.myLists = $http.get(window.location + '?mylist').success(function(data){

      $scope.myLists = data.mylist;
  });

  $scope.showModal = false;
  $scope.toggleModal = function(){
  	$scope.showModal = !$scope.showModal;
  }

  //----------------------------
  //	CODIGO PARA CREATE NEW
  //----------------------------
  $scope.data2send = {title: "", category: ""};
  $scope.addlist2user = function(){
	  if($scope.data2send.title && $scope.data2send.category ){
		  $http.post('/addlist2user', $scope.data2send).success(function(data){
			  location.reload(true)
		  }).error(function(data){
			  window.alert("Worst error code ever");
		  });
	  }else{
		  window.alert("Title and category have to be indicated");
	  }
  };
 
  //----------------------------
  //CODIGO PARA DELETE LISTA
  //----------------------------
  $scope.deleteList = function(listName){
	  $http.delete('/deleteList/' + listName).success(function(data){
		  $.jAlert({
              'title': data.title,
              'content': '<center>' + data.data + '</center>',
              'theme': 'red',
              'btns': { 'text': 'OK' },
              'showAnimation': 'zoomIn'
            });
		  location.reload(true);
	  }).error(function(data,status){
		  if(status == 404){
			  $.jAlert({
                  'title': data.title,
                  'content': '<center>' + data.data + '</center>',
                  'theme': 'red',
                  'btns': { 'text': 'Close' },
                  'showAnimation': 'zoomIn'
                });
		  }else{
			  $.jAlert({
                  'title': 'Error',
                  'content': '<center> There was a problem, please try again latter </center>',
                  'theme': 'red',
                  'btns': { 'text': 'Close' },
                  'showAnimation': 'zoomIn'
                });
		  }
	  })
  }

  //EJEMPLO PARA GUARDAR DATA ACCECIBLE A TODOS LOS CONTROLLERS Y PAGES
  //Para llamar funciones de los servicios:
  $scope.goToList = function(listName){
      localStorage.removeItem("userListName");
      localStorage.setItem("userListName", listName);

      //se deberia poner algun waiting para que la prox pag no abra antes de q el set se haga en localStorage
      window.location.href = "/list-page?" + listName;
  };

}]);

