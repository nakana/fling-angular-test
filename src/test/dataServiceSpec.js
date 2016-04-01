describe("サービステスト", function(){

  beforeEach(function(){
    module('app');
  });

  var httpBackend;
  var dataService;
  
  beforeEach(inject(function($httpBackend, _dataService_){
    httpBackend = $httpBackend;
    dataService = _dataService_;
  }));

  it("想定データを受けるとるテスト", function(){

    httpBackend.expect('GET', '/test/a').respond({value: 'mock-data-a'});
    
    //    httpBackend.flush();
    //    console.log(dataServcie.getData('a'));
    //    var dataService = $service('dataService');

    var result = dataServcie.getData('a');
//    expect(result).toEqual([{value: 'mock-data-a'}]);
    //        expect(result).toEqual({value: 'mock-data-a'});

    
  });
});

