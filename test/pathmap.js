var subject = require( '..' ).pathmap;
var assert = require('assert');

describe( 'pathmap', function( ){
  it( 'should be a function', function( ){
    assert.equal( typeof subject, 'function' );
  } );
  describe( '#sep', function( ){
    it( 'should be a slash by default', function( ){
      assert.equal( subject.sep, '/' );
    } );
  } );
  describe( '#dirname', function( ){
    it( 'returns the directory portion of a path', function( ){
      assert.equal( subject.dirname( 'foo/bar.txt' ), 'foo' );
    } );
    it( 'returns a dot if there is no directory', function( ){
      assert.equal( subject.dirname( 'foo' ), '.' );
    } );
    it( 'returns a slash if the parent is root', function( ){
      assert.equal( subject.dirname( '/foo' ), '/' );
    } );
  } );
  describe( '#basename', function( ){
    it( 'returns the base filename of a path', function( ){
      assert.equal( subject.basename( 'foo/bar.txt' ), 'bar.txt' );
    } );
    it( 'returns the last directory in a path', function( ){
      assert.equal( subject.basename( 'foo/bar/' ), 'bar' );
    } );
    it( 'returns a single string straight up', function( ){
      assert.equal( subject.basename( 'foo' ), 'foo' );
    } );
    it( 'chomps the extension if given', function( ){
      assert.equal( subject.basename( 'foo/bar.txt', '.txt' ), 'bar' );
    } );
  } );
  describe( '#extname', function( ){
    it( 'returns the extension of a path', function( ){
      assert.equal( subject.extname( 'foo/bar.txt' ), '.txt' );
    } );
    it( 'only returns the first extension', function( ){
      assert.equal( subject.extname( 'foo.txt.erb' ), '.erb' );
    } );
    it( 'returns an empty string if there is no extension', function( ){
      assert.equal( subject.extname( 'foo' ), '' );
    } );
  } );
  describe( '#chomp', function( ){
    it( 'removes the last characters of a string', function( ){
      assert.equal( subject.chomp( 'foo/bar.txt', '.txt' ), 'foo/bar' );
    } );
    it( 'does not remove characters in the middle of the string', function( ){
      assert.equal( subject.chomp( 'foo/bar.txt', 'bar' ), 'foo/bar.txt' );
    } );
    it( 'does not remove characters that do not match', function( ){
      assert.equal( subject.chomp( 'foo/bar.txt', '.js' ), 'foo/bar.txt' );
    } );
  } );
  describe( '#replace', function( ){
    it( 'parses the spec and performs the replacement', function( ){
      assert.equal( subject.replace( 'bar', 'ar,eer' ), 'beer' );
    } );
    it( 'treats the first part of the replacement as a regex', function( ){
      assert.equal( subject.replace( 'src_work/src/org/onstepback/proj/A.java',
        '\\bsrc\\b,bin' ), 'src_work/bin/org/onstepback/proj/A.java' );
    } );
    it( 'supports multiple replacement specs', function( ){
      assert.equal( subject.replace( 'src_work/src/org/onstepback/proj/A.java',
        '\\bsrc\\b,bin;java,class' ), 'src_work/bin/org/onstepback/proj/A.class' );
    } );
    it( 'replaces with an empty string if no replacement is given', function( ){
      assert.equal( subject.replace( 'foobar', 'foo' ), 'bar' );
    } );
    it( 'yields the replacement to the callback if a splat is given', function( ){
      assert.equal( subject.replace( 'foo.TXT', 'TXT,*', function( ext ){
        return ext.toLowerCase( );
      } ), 'foo.txt' );
    } );
    it( 'returns the string as-is if no pattern is given', function( ){
      assert.equal( subject.replace( 'foo.txt' ), 'foo.txt' );
    } );
  } );
} );
