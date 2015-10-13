app.controller('event', ['$scope', function($scope) {
  $scope.event = {
        type: 'Public',
        name: '"Tomorrow" Premiere',
        date: new Date('2015','10','15'),
        host: 'dreamworks',
        locale: 'S Movie Theatre',
        address: 'Something St 1815 Los Angeles, California Zip Code Something',
        description: 'Dreamworks invites the FilmShack community to the world premiere of "Tomorrow"!',
        attendants: [{
          name: 'user-1',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-2',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-3',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-4',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-5',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-6',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-7',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-8',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-9',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-10',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-11',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-12',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-13',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-14',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-15',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-16',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-17',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-18',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-19',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-20',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-21',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-22',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-23',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-24',
          img: 'static/img/profile-picture-placeholder.svg'
        }, {
          name: 'user-25',
          img: 'static/img/profile-picture-placeholder.svg'
        }]
      };


      $scope.showModal1 = false;
  $scope.toggleModal1 = function(){
    $scope.showModal1 = !$scope.showModal1;
      };
    $scope.showModal2 = false;
  $scope.toggleModal2 = function(){
    $scope.showModal2 = !$scope.showModal2;
  };
}]);