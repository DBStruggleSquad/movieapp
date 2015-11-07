/**
 * Created by galarwen on 10-30-15.
 */

app.factory('listFac', function($http, $rootScope){

    var factorySev = {};

    //variables:
    factorySev.listName = "default";

    //Method for go to a specific list page
    factorySev.goToList = function(sendedListName){
        this.listName = "perro";
        $rootScope.$broadcast("valuesUpdated");
        window.location.href = "/list-page"
    };

    factorySev.getListName = function(){
      return this.listName;
    };

    return factorySev;
});

app.service('listSev', function($http, $rootScope){

    //variables:
    this.listName = "default";

    //Method for go to a specific list page
    this.goToList = function(sendedListName){
        this.listName = "perro";
        window.location.href = "/list-page"
    };

    this.getListName = function(){
        return this.listName;
    };

});