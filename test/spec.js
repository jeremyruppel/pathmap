var pathmap = require( '../pathmap.js' ).pathmap
  , expect  = require( 'chai' ).expect;

describe( 'substitution', function( ){
  it( 'returns the complete path', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%p' ) ).to.equal( 'a/b/c/d/file.txt' );
  } );
  it( 'returns the base file name of the path, with its file extension, but without any directories', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%f' ) ).to.equal( 'file.txt' );
  } );
  it( 'returns the file name of the path without its file extension', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%n' ) ).to.equal( 'file' );
  } );
  it( 'returns the directory list of the path', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%d' ) ).to.equal( 'a/b/c/d' );
  } );
  it( 'returns the extension of the path', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%x' ) ).to.equal( '.txt' );
  } );
  it( 'returns everything but the extension of the path', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%X' ) ).to.equal( 'a/b/c/d/file' );
  } );
  it( 'returns the file separator', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%s' ) ).to.equal( '/' );
  } );
  it( 'returns a literal percent sign', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%%' ) ).to.equal( '%' );
  } );
} );
