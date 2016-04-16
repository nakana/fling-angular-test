angular
  .module('app', ['ui.router', 'ngResource'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/login');

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

    $stateProvider
    .state('login', {
      url:'/login',
      controller: function($scope, $resource, $state){
	$scope.login = function(user){
	  $resource('/api/login/:user').get({user: user}, function(data){
	    console.log('*** OK ***');
	    console.log(data);
	    $state.go('top');	    
	  }, function(rejection){
	    console.log('*** NG ***');
	    console.log(rejection);
	    $state.go('login');
	  });
	}
      },
      templateUrl: '/src/main/html/login.html',
    }).state('top', {
      url:'/top',
      templateUrl: '/src/main/html/top.html',
    }).state('top.a', {
      url:'/a',
      resolve: {
 	data: function($resource, dataService){
 	  return dataService.getData('a');
 	},
      },
      controller: function($scope, data){
	$scope.data = data;
      },
      template: '<div>AAA{{data.val}}AAA</div>',
    }).state('top.b', {
      url:'/b',
      templateUrl: '/src/main/html/side-B.html',
    }).state('top.c', {
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
