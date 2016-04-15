angular
  .module('app')
  .service('dataService', function($resource){
    this.getData = function(s){
      return $resource('/test/' + s);
    };
  });
