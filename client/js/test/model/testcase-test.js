describe('testcase', function () {
  var expect = chai.expect,
      model = challenge.model;

  describe('.create', function () {

    it('should require arguments and expected output', function () {
      expect(
        model.testcase.create.bind(model.testcase)
      ).to.throw('Test requires arguments and expected output');
    });


  });


});