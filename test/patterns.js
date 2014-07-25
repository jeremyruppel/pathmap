var subject = require('..');
var assert = require('assert');

describe('patterns', function() {
  it('exposes the default patterns', function() {
    assert.equal(typeof subject.patterns['p'], 'function');
    assert.equal(typeof subject.patterns['f'], 'function');
    assert.equal(typeof subject.patterns['n'], 'function');
    assert.equal(typeof subject.patterns['d'], 'function');
    assert.equal(typeof subject.patterns['x'], 'function');
    assert.equal(typeof subject.patterns['X'], 'function');
    assert.equal(typeof subject.patterns['s'], 'function');
    assert.equal(typeof subject.patterns['%'], 'function');
  });
  it('throws if an undefined pattern is given', function() {
    assert.throws(function() {
      subject('a/b/c/d/file.txt', '%q');
    }, 'Unknown pathmap specifier q in "%q"');
  });
  it('allows new patterns to be added', function() {
    subject.patterns['z'] = function() {
      return 'ZZZ';
    };
    assert.equal(subject('a/b/c/d/file.txt', '%d/%z%x'), 'a/b/c/d/ZZZ.txt');
    delete subject.patterns['z'];
  });
});
