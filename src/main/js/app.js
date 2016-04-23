var error_message;

angular
  .module('app', ['ui.router', 'ngResource'])
  .config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise('/login');

    $httpProvider.interceptors.push(function($q, $location){
      return {
	'request': function(config){
	  console.log('interceptor REQUEST!!!!!!');
	  console.log(config);
	  return config;
	},
	'response': function(response){
	  console.log('interceptor RESPONSE!!!!!!');
	  console.log(response);
	  return response;
	},
	'requestError': function(rejection){
	  console.log('interceptor REQUEST ERROR!!!!!!');
	  console.log(rejection);
	  return $q.reject(rejection);
	},
	'responseError': function(rejection){
	  console.log('interceptor RESPONSE ERROR!!!!!!');
	  console.log(rejection);
	  error_message = rejection.status + ': ' + rejection.statusText;
	  if(rejection.status !== 401) {
	    location.href ='index.html#/error';
	  }
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
    }).state('success', {
      url:'/success',
      templateUrl: '/src/main/html/success.html',
    }).state('error', {
      url:'/error',
      controller: function($scope){
	$scope.errMsg = error_message;
      },
      templateUrl: '/src/main/html/error.html',
    })
    ;
  })
  .controller('hoge', function($scope, $state, $resource){
    $scope.goPage = function(page){
      $state.go(page);
    };
    $scope.goError = function(status){
      // $resource('/api/error/:status').get({status: status}, function(data){
      // 	$state.go('success');
      // }, function(rejection){
      // 	$state.go('error');
      // });
      $resource('/api/error/:status').get({status: status}, function(data){
	$state.go('success');
      });
    };
    $scope.goTransNothing = function(){
      $resource('/').get(function(data){
	$state.go('success');
      });
    };
    $scope.goTransBasic = function(){
      $resource('/:hoge', {hoge: 178, geho: 234}, {
	get: {
	  transformRequest: function(config){
	    console.log('trsfmReq!!!!');
	    console.log(config);
	    return 'hoge=reqreqreq';
	  },
	  transformResponse: function(response){
	    console.log('trsfmRes!!!!');
	    console.log(response);
	    return 'resresres';
	  }
	}
      }).get(function(data){
	$state.go('success');
      });
    };
    
    // 別に関数をクリアしている訳ではなかった
    $scope.goTransEmptyList = function(){
      $resource('/', {}, {get : { transformRequest: [], transformResponse: [] }}).get(function(data){
	$state.go('success');
      });
    };


    $scope.goTransList = function(){
      $resource('/', {}, {
	get: {
	  transformRequest: [function(config){
	    console.log('trsfmReq0!!!!');
	    console.log(config);
	    return 'reqreqreq';
	  },function(config){
	    console.log('trsfmReq1!!!!');
	    console.log(config);
	    return config + '1';
	  },function(config){
	    console.log('trsfmReq2!!!!');
	    console.log(config);
	    return config + '2';
	  }],
	  transformResponse: function(response){
	    console.log('trsfmRes!!!!');
	    console.log(response);
	    return 'resresres';
	  }}}).get(function(data){
	    $state.go('success');
	  });
    };
      
    $scope.goPost = function(){
      var MyPost = $resource('/mypost', {}, {
	save: {
	  transformRequest: function(config){
	    console.log('trsfmReq!!!!');
	    console.log(config);
	    return 'hoge=reqreqreq';
	  },
	  transformResponse: function(response){
	    console.log('trsfmRes!!!!');
	    console.log(response);
	    return 'resresres';
	  }
	}
      });

      var mp = new MyPost();
      mp.addr = 'abc';
      mp.$save(function(data){
	console.log(data);
      });
    };
  });

