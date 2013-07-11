var pathmap = require( '../pathmap.js' ).pathmap
  , expect  = require( 'chai' ).expect;

describe( 'pathmap', function( ){
  it( 'should be a function', function( ){
    expect( pathmap ).to.be.a( 'function' );
  } );
  describe( '#dirname', function( ){
    it( 'returns the directory portion of a path', function( ){
      expect( pathmap.dirname( 'foo/bar.txt' ) ).to.equal( 'foo' );
    } );
    it( 'returns a dot if there is no directory', function( ){
      expect( pathmap.dirname( 'foo' ) ).to.equal( '.' );
    } );
  } );
  describe( '#basename', function( ){
    it( 'returns the base filename of a path', function( ){
      expect( pathmap.basename( 'foo/bar.txt' ) ).to.equal( 'bar.txt' );
    } );
    it( 'returns the last directory in a path', function( ){
      expect( pathmap.basename( 'foo/bar/' ) ).to.equal( 'bar' );
    } );
    it( 'returns a single string straight up', function( ){
      expect( pathmap.basename( 'foo' ) ).to.equal( 'foo' );
    } );
    it( 'chomps the extension if given', function( ){
      expect( pathmap.basename( 'foo/bar.txt', '.txt' ) ).to.equal( 'bar' );
    } );
  } );
  describe( '#extname', function( ){
    it( 'returns the extension of a path', function( ){
      expect( pathmap.extname( 'foo/bar.txt' ) ).to.equal( '.txt' );
    } );
    it( 'only returns the first extension', function( ){
      expect( pathmap.extname( 'foo.txt.erb' ) ).to.equal( '.erb' );
    } );
    it( 'returns an empty string if there is no extension', function( ){
      expect( pathmap.extname( 'foo' ) ).to.equal( '' );
    } );
  } );
  describe( '#chomp', function( ){
    it( 'removes the last characters of a string', function( ){
      expect( pathmap.chomp( 'foo/bar.txt', '.txt' ) ).to.equal( 'foo/bar' );
    } );
    it( 'does not remove characters in the middle of the string', function( ){
      expect( pathmap.chomp( 'foo/bar.txt', 'bar' ) ).to.equal( 'foo/bar.txt' );
    } );
    it( 'does not remove characters that do not match', function( ){
      expect( pathmap.chomp( 'foo/bar.txt', '.js' ) ).to.equal( 'foo/bar.txt' );
    } );
  } );
} );
