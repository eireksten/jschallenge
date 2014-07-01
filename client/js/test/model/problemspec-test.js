describe('problemspec', function () {

  var expect = chai.expect,
      spec = challenge.model.problemspec;

  describe('create problem', function () {

    it('should set given parameters', function () {
      var prob = spec.create({
        title: 'Addition',
        description: 'You are given two numbers as parameters to your function. Return the result of adding them.',
        func: 'addThem',
        parameters: ['x', 'y']
      });
      expect(prob.getTitle()).to.equal('Addition');
      expect(prob.getDescription()).to.equal('You are given two numbers as parameters to your function. Return the result of adding them.');
      expect(prob.getFunctionName()).to.equal('addThem');
      expect(prob.getParameterlist()).to.deep.equal(['x', 'y']);

    });

    it('should define default options', function () {
      var prob = spec.create();
      expect(prob.getTitle()).to.equal('Mysterious Problem');
      expect(prob.getDescription()).to.equal('No description!');
      expect(prob.getFunctionName()).to.equal('solve');
      expect(prob.getParameterlist()).to.deep.equal([]);
    });

  });

  describe('solution string', function () {

    it('should set correct end string', function () {
      expect(spec.create().getSolutionEnd()).to.equal('}');
    });

    it('should use function name in solution start', function () {
      expect(spec.create({func: 'add'}).getSolutionStart()).to.equal('function add() {');
    });

    it('should set correct parameters in solution start', function () {
      expect(spec.create({parameters: ['x', 'y']}).getSolutionStart()).to.equal('function solve(x, y) {');
    });

  });

});