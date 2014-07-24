var subject = require( '..' ).pathmap;
var assert = require('assert');

describe( 'directories', function( ){
  it( 'returns all directories by default', function( ){
    assert.equal( subject( 'a/b/c/d/file.txt', '%d' ), 'a/b/c/d' );
  } );
  it( 'returns `n` directories from the left-hand side', function( ){
    assert.equal( subject( 'a/b/c/d/file.txt', '%1d' ), 'a' );
    assert.equal( subject( 'a/b/c/d/file.txt', '%2d' ), 'a/b' );
  } );
  it( 'returns `n` directories from the right-hand side', function( ){
    assert.equal( subject( 'a/b/c/d/file.txt', '%-1d' ), 'd' );
    assert.equal( subject( 'a/b/c/d/file.txt', '%-2d' ), 'c/d' );
  } );
} );
