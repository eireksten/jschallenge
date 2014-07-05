describe('modelmixin', function () {

  var expect = chai.expect;

  describe('events', function () {

    it('should notify all registered listeners', function (done) {
      var model = _.assign({}, challenge.modelmixin),
          expected = 2;

      model.on('event', function () {
        if (--expected <= 0) {
          done();
        }
      });

      model.on('event', function () {
        if (--expected <= 0) {
          done();
        }
      });      

      model.trigger('event');

    });

    it('should not notify listeners on different event', function () {
      var model = _.assign({}, challenge.modelmixin);
      model.on('event', function () {});
      model.on('other', function () {expect(false).to.be.true;});
      model.trigger('event');

    });

    it('should not notify removed listeners', function () {
      var model = _.assign({}, challenge.modelmixin),
          listener = function () { expect(false).to.be.true; };
      model.on('event', listener);
      model.off('event', listener);
      model.trigger('event');      
    });

  });

  describe('attributes', function () {

    it('should get the set attributes', function () {
      var model = _.assign({}, challenge.modelmixin);

      model.set('a', 'hello');
      model.set('b', 'world');

      expect(model.get('b')).to.equal('world');
      expect(model.get('a')).to.equal('hello');

    });

    it('should trigger change events when changing an attribute', function (done) {
      var model = _.assign({}, challenge.modelmixin),
          expected = 4,
          listener = function () {
            if (--expected <= 0) {
              done();
            }
          };
      
      model.on('change', listener);
      model.on('change:myattr', listener);

      model.set('myattr', 'hello');
      model.set('myattr', 'world'); 

    });

    it('should pass arguments when triggering change events', function () {
      var model = _.assign({}, challenge.modelmixin),
          key = 'mykey',
          oldval = 'hello',
          newval = 'world',
          listener = function (m, k, n, o) {
            expect(m).to.equal(model);
            expect(k).to.equal(key);
            expect(n).to.equal(newval);
            expect(o).to.equal(oldval);
          };

      model.set(key, oldval);
      
      model.on('change', listener);
      model.on('change:' + key, listener);

      model.set(key, newval);

    });

    it('should not trigger change events when setting to same value', function () {
      var model = _.assign({}, challenge.modelmixin),
          listener = function () { expect(false).to.be.true; };

      model.set('myattr', 'value');
      model.on('change', listener);
      model.on('change:myattr', listener);
      model.set('myattr', 'value');

    });

  });

});