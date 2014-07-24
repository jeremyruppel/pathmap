var pathmap = require( '..' ).pathmap
  , expect  = require( 'chai' ).expect;

describe( 'pathmap', function( ){
  it( 'should be a function', function( ){
    expect( pathmap ).to.be.a( 'function' );
  } );
  describe( '#sep', function( ){
    it( 'should be a slash by default', function( ){
      expect( pathmap.sep ).to.equal( '/' );
    } );
  } );
  describe( '#dirname', function( ){
    it( 'returns the directory portion of a path', function( ){
      expect( pathmap.dirname( 'foo/bar.txt' ) ).to.equal( 'foo' );
    } );
    it( 'returns a dot if there is no directory', function( ){
      expect( pathmap.dirname( 'foo' ) ).to.equal( '.' );
    } );
    it( 'returns a slash if the parent is root', function( ){
      expect( pathmap.dirname( '/foo' ) ).to.equal( '/' );
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
  describe( '#replace', function( ){
    it( 'parses the spec and performs the replacement', function( ){
      expect( pathmap.replace( 'bar', 'ar,eer' ) ).to.equal( 'beer' );
    } );
    it( 'treats the first part of the replacement as a regex', function( ){
      expect( pathmap.replace( 'src_work/src/org/onstepback/proj/A.java',
        '\\bsrc\\b,bin' ) ).to.equal( 'src_work/bin/org/onstepback/proj/A.java' );
    } );
    it( 'supports multiple replacement specs', function( ){
      expect( pathmap.replace( 'src_work/src/org/onstepback/proj/A.java',
        '\\bsrc\\b,bin;java,class' ) ).to.equal( 'src_work/bin/org/onstepback/proj/A.class' );
    } );
    it( 'replaces with an empty string if no replacement is given', function( ){
      expect( pathmap.replace( 'foobar', 'foo' ) ).to.equal( 'bar' );
    } );
    it( 'yields the replacement to the callback if a splat is given', function( ){
      expect( pathmap.replace( 'foo.TXT', 'TXT,*', function( ext ){
        return ext.toLowerCase( );
      } ) ).to.equal( 'foo.txt' );
    } );
    it( 'returns the string as-is if no pattern is given', function( ){
      expect( pathmap.replace( 'foo.txt' ) ).to.equal( 'foo.txt' );
    } );
  } );
} );
