var subject = require('..');
var assert = require('assert');

describe('replacement', function() {
  it('supports replacement for %d', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{a,A}d'), 'A/b/c/d');
  });
  it('supports replacement and partials for %d', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{a,A}2d'), 'A/b');
  });
  it('supports replacement for %p', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{a,A}p'), 'A/b/c/d/file.txt');
  });
  it('supports replacement for %f', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{txt,js}f'), 'file.js');
  });
  it('supports replacement for %n', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{ile,ood}n'), 'food');
  });
  it('supports replacement for %x', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{xt,ext}x'), '.text');
  });
  it('supports replacement for %X', function() {
    assert.equal(subject('a/b/c/d/file.txt', '%{a,A}X'), 'A/b/c/d/file');
  });
});
