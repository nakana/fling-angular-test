angular
  .module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/a');
    $stateProvider.state('a', {
      url:'/a',
      templateUrl: '/src/main/hmtl/side-A.html',
    }).state('b', {
      url:'/b',
      templateUrl: '/src/main/html/side-B.html',
    }).state('c', {
      url:'/c',
      templateUrl: '/src/main/html/side-C.html',
    })
    ;
  })
  .controller('hoge', function($scope, $state){
    $scope.goPage = function(page){
      $state.go(page);
    };
  });
;
