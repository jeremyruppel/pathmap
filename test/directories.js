var pathmap = require( '../pathmap.js' ).pathmap
  , expect  = require( 'chai' ).expect;

describe( 'directories', function( ){
  it( 'returns all directories by default', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%d' ) ).to.equal( 'a/b/c/d' );
  } );
  it( 'returns `n` directories from the left-hand side', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%1d' ) ).to.equal( 'a' );
    expect( pathmap( 'a/b/c/d/file.txt', '%2d' ) ).to.equal( 'a/b' );
  } );
  it( 'returns `n` directories from the right-hand side', function( ){
    expect( pathmap( 'a/b/c/d/file.txt', '%-1d' ) ).to.equal( 'd' );
    expect( pathmap( 'a/b/c/d/file.txt', '%-2d' ) ).to.equal( 'c/d' );
  } );
} );
