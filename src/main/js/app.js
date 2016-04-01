angular
  .module('app', ['ui.router', 'ngResource'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/a');
    $stateProvider.state('a', {
      url:'/a',
      resolve: {
	data: function($resource){
	  return $resource('/test/a').get();
	}
      },
      controller: function($scope, data){
	$scope.data = data;
      },
      template: '<div>{{data.val}}</div>',
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
