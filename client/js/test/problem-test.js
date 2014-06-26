describe('problem', function () {

  var expect = chai.expect,
      problem = challenge.problem;

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

  describe('defining test cases', function () {
    var prob,
        addTest = function (a, b) {
          prob.addTest({
            args: [a, b],
            expected: a + b
          });

        };

    beforeEach(function () {
      prob = problem.create({
        title: 'Addition',
        description: 'Add two numbers',
        func: 'addThem',
        parameters: ['x', 'y']
      });
    });



    it('should add defined test cases', function () {

      addTest(2, 3);
      expect(prob.testCount()).to.equal(1);
      addTest(0, -3);
      expect(prob.testCount()).to.equal(2);

      expect(prob.getTest(0)).to.deep.equal({
        args: [2, 3],
        expected: 5
      });

      expect(prob.getTest(1)).to.deep.equal({
        args: [0, -3],
        expected: -3
      });

    });

    it('should remove test', function () {
      var testtoremove = {
        args: [19, -22],
        expected: -3
      };
      addTest(2, 6);
      addTest(1, 8);
      prob.addTest(testtoremove);
      addTest(1, 1);

      expect(prob.tests()).to.include.members([testtoremove]);
      prob.removeTest(testtoremove);
      expect(prob.tests()).to.not.include.members([testtoremove]);


    })

  });

});