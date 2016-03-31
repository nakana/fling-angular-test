angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/a');
    $stateProvider.state('a', {
      url:'/a',
      templateUrl: 'side-A.html',
    }).state('b', {
      url:'/b',
      templateUrl: 'side-B.html',
    }).state('c', {
      url:'/c',
      templateUrl: 'side-C.html',
    })
    ;
  })
  .controller('hoge', function($scope, $state){
    $scope.goPage = function(page){
      $state.go(page);
    };
  });
;
