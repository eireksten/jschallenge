describe('problem', function () {

  var expect = chai.expect;

  describe('create problem', function () {

    it('should set given parameters', function () {
      var prob = problem.create({
        title: 'Addition',
        description: 'Add two numbers',
        func: 'addThem',
        parameters: ['x', 'y']
      });
      expect(prob.getTitle()).to.equal('Addition');
      expect(prob.getProblemDescription()).to.equal('Add two numbers');
      expect(prob.getFunctionName()).to.equal('addThem');
      expect(prob.getParameterlist()).to.deep.equal(['x', 'y']);

    });

    it('should define default options', function () {
      var prob = problem.create();
      expect(prob.getTitle()).to.equal('Mysterious Problem');
      expect(prob.getProblemDescription()).to.equal('No description!');
      expect(prob.getFunctionName()).to.equal('solve');
      expect(prob.getParameterlist()).to.deep.equal([]);
    });

  });

  describe('solution string', function () {

    it('should set correct end string', function () {
      expect(problem.create().getSolutionEnd()).to.equal('}');
    });

    it('should use function name in solution start', function () {
      expect(problem.create({func: 'add'}).getSolutionStart()).to.equal('function add() {');
    });

    it('should set correct parameters in solution start', function () {
      expect(problem.create({parameters: ['x', 'y']}).getSolutionStart()).to.equal('function solve(x, y) {');
    });

  });

});