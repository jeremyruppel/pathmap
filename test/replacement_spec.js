var pathmap = require( '../pathmap.js' ).pathmap
  , expect  = require( 'chai' ).expect;

describe( 'replacement', function( ){
  it( 'supports replacement for %d', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{a,A}d' ) ).to.equal( 'A/b/c/d' );
  } );
  it( 'supports replacement and partials for %d', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{a,A}2d' ) ).to.equal( 'A/b' );
  } );
  it( 'supports replacement for %p', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{a,A}p' ) ).to.equal( 'A/b/c/d/file.txt' );
  } );
  it( 'supports replacement for %f', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{txt,js}f' ) ).to.equal( 'file.js' );
  } );
  it( 'supports replacement for %n', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{ile,ood}n' ) ).to.equal( 'food' );
  } );
  it( 'supports replacement for %x', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{xt,ext}x' ) ).to.equal( '.text' );
  } );
  it( 'supports replacement for %X', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%{a,A}X' ) ).to.equal( 'A/b/c/d/file' );
  } );
} );
