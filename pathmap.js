( function( exports, undefined ){

  /**
   *
   */
  function pathmap( path, spec ){
    return spec.replace( /%(-?\d+)?([\w%])/g, function( match, args, pattern ){
      if( patterns[ pattern ] ){
        return patterns[ pattern ].call( path, args );
      } else {
        // console.log( [ ].slice.call( arguments ) );
        throw new Error( "Unknown pathmap specifier " + match + " in '" + spec + "'" );
      }
    } );
  };

  /**
   * The path separator.
   */
  pathmap.sep = '/';

  /**
   * Returns the directory name of `path`. Returns '.'
   * if there is no directory part.
   */
  pathmap.dirname = function( path, count ){
    path = this.chomp( path, this.sep );
    path = path.split( this.sep );
    path = path.slice( 0, -1 );

    if( count < 0 ) path = path.slice( count );
    if( count > 0 ) path = path.slice( 0, count );

    if( path.length == 0 ) return '.';
    if( path.length == 1 && path[ 0 ] == '' ) return this.sep;

    return path.join( this.sep );
  };

  /**
   * Returns the base filename of `path`, removing the
   * extension `ext` if given.
   */
  pathmap.basename = function( path, ext ){
    path = this.chomp( path, this.sep );
    path = this.chomp( path, ext );

    return path.split( this.sep ).pop( );
  };

  /**
   * Returns the extension of `path`, or an empty string
   * if there isn't one.
   */
  pathmap.extname = function( path ){
    var index = path.lastIndexOf( '.' );

    if( index > -1 ){
      return path.slice( index );
    } else {
      return '';
    }
  };

  /**
   * Removes `str` from the end of `path`.
   */
  pathmap.chomp = function( path, str ){
    return path.replace( new RegExp( str + '$' ), '' );
  };

  var patterns = {

    /**
     * The complete path.
     */
    'p' : function( ){
      return this;
    },

    /**
     * The base file name of the path, with its file extension,
     * but without any directories.
     */
    'f' : function( ){
      // TODO configure file separator
      return pathmap.basename( this );
    },

    /**
     * The file name of the path without its file extension.
     */
    'n' : function( ){
      return pathmap.basename( this, pathmap.extname( this ) );
    },

    /**
     * The directory list of the path.
     */
    'd' : function( count ){
      return pathmap.dirname( this, count );
    },

    /**
     * The file extension of the path. An empty string if there
     * is no extension.
     */
    'x' : function( ){
      return pathmap.extname( this );
    },

    /**
     * Everything but the file extension.
     */
    'X' : function( ){
      return pathmap.chomp( this, pathmap.extname( this ) );
    },

    /**
     * The alternate file separator if defined, otherwise use
     * the standard file separator.
     */
    's' : function( ){
      return pathmap.sep;
    },

    /**
     * A percent sign.
     */
    '%' : function( ){
      return '%';
    }
  };

  /**
   * Export!
   */
  exports.pathmap = pathmap;

} )( typeof window != 'undefined' ? window : exports );
