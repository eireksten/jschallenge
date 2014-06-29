describe('testrunner', function () {

  var expect = chai.expect,
      testrunner = challenge.model.testrunner,
      spec = challenge.model.problemspec;

  describe('create solution', function () {
    it('should set problem reference', function () {
      var prob = spec.create();
      var solrunner = testrunner.create(prob);

      expect(solrunner.getProblem()).to.equal(prob);
    });
  });

  describe('solution string', function () {

    it('should build solution from user input', function () {
      var solrunner = testrunner.create(spec.create());
      solrunner.setSolution('return 4;');
      expect(
        solrunner.createSolutionString()
      ).to.equal('(function () {return 4;})');
    });

    it('should override solution when argument is given', function () {
      var solrunner = testrunner.create(spec.create());
      solrunner.setSolution('return 4;');
      expect(
        solrunner.createSolutionString('return "Hello World";')
      ).to.equal('(function () {return "Hello World";})');
    });

  });

  describe('run solution', function () {

    var prob, solrunner;

    beforeEach(function () {
      prob = spec.create({
        title: 'Addition',
        description: 'Add two numbers',
        func: 'addThem',
        parameters: ['x', 'y']
      });

      prob.addTest({
        args: [2, 3],
        expected: 5
      });

      solrunner = testrunner.create(prob);

    });

    it('should produce the result of running the code', function (done) {
      solrunner.setSolution("return 5;");
      solrunner.run(function (err, result) {
        expect(err).to.be.null;
        expect(result).to.equal(5);
        done();
      });
    });

    it('should set an error when the code times out', function (done) {
      solrunner.setSolution("while(true){};");
      solrunner.run(function (err, result) {
        expect(err).to.equal('The solution timed out.');
        expect(result).to.be.undefined;
        done();
      })
    });

    it('should set an error when the code throws an error', function (done) {
      solrunner.setSolution("throw 'This is so wrong!'");
      solrunner.run(function (err, result) {
        expect(err).to.equal('Uncaught This is so wrong!');
        expect(result).to.be.undefined;
        done();
      });
    });

  });

});