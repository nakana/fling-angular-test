angular
  .module('app', ['ui.router', 'ngResource'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/a');

    $httpProvider.interceptors.push(function($q){
      return {
	'requestError': function(rejection){
	  console.log('REQUEST!!!!!!');
	  return $q.reject(rejection);
	},
	'responseError': function(rejection){
	  console.log('RESPONSE!!!!!!');
	  return $q.reject(rejection);
	},
      }
    });



    $stateProvider.state('a', {
      url:'/a',
      resolve: {
 	data: function($resource, dataService){
 	  return dataService.getData('a');
 	},
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
