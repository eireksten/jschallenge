describe('problemview', function () {

  var expect = chai.expect,
      problem = challenge.model.problem,
      problemview = challenge.view.problemview;

  describe('create', function () {

    var prob;

    beforeEach(function () {
      prob = problem.create({

      });
    });


    it('should contain a problem title and description', function () {
      var view = problemview.create(prob);
      view.render();

      expect(view.$el.find('.title').text()).to.equal(prob.getTitle());
      expect(view.$el.find('.description').text()).to.equal(prob.getDescription());

    });
    

  });

});