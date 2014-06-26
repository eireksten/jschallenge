describe('solution-runner', function () {

  var expect = chai.expect;

  describe('create solution', function () {
    it('should set problem reference', function () {
      var prob = problem.create();
      var solrunner = solutionrunner.create(prob);

      expect(solrunner.getProblem()).to.equal(prob);
    });
  });

  describe('solution string', function () {
    
    it('should build solution from user input', function () {
      var solrunner = solutionrunner.create(problem.create());
      solrunner.setSolution('return 4;');
      expect(
        solrunner.createSolutionString()
      ).to.equal('function solve() {return 4;}');
    });

    it('should override solution when argument is given', function () {
      var solrunner = solutionrunner.create(problem.create());
      solrunner.setSolution('return 4;');
      expect(
        solrunner.createSolutionString('return "Hello World";')
      ).to.equal('function solve() {return "Hello World";}');
    });

  });

});