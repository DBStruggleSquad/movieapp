app.controller('events', ['$scope', function($scope) {
  $scope.myEvents = [{
        name: '"Tomorrow" Premiere',
        date: new Date('2015','10','15'),
        host: 'dreamworks'
      }, 
      { 
        name: 'Get Together',
        date: new Date('2015','11','15'),
        host: 'joe'
      }
    ]

  $scope.publicEvents = [{
        name: '"Tomorrow" Premiere',
        date: new Date('2015','10','15'),
        host: 'dreamworks'
      }, 
      { 
        name: 'Get Together',
        date: new Date('2015','11','15'),
        host: 'joe'
      },
      { 
        name: 'Movie Night',
        date: new Date('2015','09','30'),
        host: 'katrific'
      },
      { 
        name: 'Event',
        date: new Date('2015','12','01'),
        host: 'user'
      }
    ]

    $scope.goToEvent = function(eventID){
        window.location.href = '/event-page';
    }
}]);