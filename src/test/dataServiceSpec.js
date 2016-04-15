describe("サービステスト", function(){

  beforeEach(function(){
    module('app');
  });

  var $httpBackend;
  
  beforeEach(inject(function(_$httpBackend_){
    $httpBackend = _$httpBackend_;
  }));

  it("想定データを受けるとるテスト", inject(function(dataService){

    $httpBackend.expect('GET', '/test/a').respond({value: 'mock-data-a'});
    var result;
    dataService.getData('a').get(function(data){
      result = data.value;
    });
    $httpBackend.flush();
    expect(result).toEqual('mock-data-a');
  }));

  it("想定データを受けとれず400番を返すテスト", inject(function(dataService){
    $httpBackend.expect('GET', '/test/a').respond(400, '', {Coneections: 'keep-alive'});
    var result;
    dataService.getData('a').get(function(data){
      result = data.value;
    }, function(data){
      // console.log(data);
      // console.log(data.status);
      // console.log(data.headers());
      // console.log(data.headers('expires'));
      result = 'error';
    });
    $httpBackend.flush();

    expect(result).toEqual('error');
  }));

  it("想定データを受けとれず500番を返すテスト", inject(function(dataService){
    $httpBackend.expect('GET', '/test/a').respond(500, '', {Expires: 0});
    var result;
    dataService.getData('a').get(function(data){
      result = data.value;
    }, function(data){
      // console.log(data);
      // console.log(data.status);
      // console.log(data.headers());
      // console.log(data.headers('expires'));
      result = 'error';
    });
    $httpBackend.flush();

    expect(result).toEqual('error');
  }));
});
  

