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
});

