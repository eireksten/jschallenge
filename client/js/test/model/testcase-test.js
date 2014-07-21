describe('testcase', function () {
  var expect = chai.expect,
      model = challenge.model;

  describe('.create', function () {

    it('should require arguments and expected output', function () {
      expect(
        model.testcase.create.bind(model.testcase)
      ).to.throw('Test requires arguments and expected output');
    });

    it('should expose arguments and expected output', function () {
      var args = [2, 1],
          out = 3,
          testcase = model.testcase.create({
            arguments: args,
            output: out
          });

      expect(testcase.get('arguments')).to.deep.equal(args);
      expect(testcase.get('output')).to.deep.equal(out);

    });


  });


});