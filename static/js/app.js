var app = angular.module("myApp", ['angular-flexslider', 'ngFileUpload']).run(function($rootScope){
    $rootScope.list = {
        name: 'My Top Ten',
        movies: [{
            title: 'Avatar',
            year: '2009',
        }, {
            title: 'Avengers',
            year: 'some year',
        }, {
            title: 'Some movie',
            year: 'some year',
        }]
    };

    $rootScope.setList = function(listName){
        $rootScope.list = {
            name: 'My Top 30',
            movies: [{
                title: 'Avatar',
                year: '2009',
            }, {
                title: 'Avengers',
                year: 'some year',
            }, {
                title: 'Some movie',
                year: 'some year',
            }]
        };
    }
});
