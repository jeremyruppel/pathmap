( function( exports, undefined ){

  /**
   * Matches any pathmap patterns, with the following capture groups:
   * 1: An optional replacement spec.
   * 2: An optional count.
   * 3: The pathmap pattern identifier.
   */
  var regexp = /%(?:\{([^}]*)\})?(-?\d+)?([\w%])/g;

  /**
   * Maps a path to a path specification. The supported patterns are:
   * TODO
   */
  function pathmap( path, spec, callback ){
    return spec.replace( regexp, function( match, replace, count, pattern ){
      if( patterns[ pattern ] ){
        return patterns[ pattern ].call( path, replace, count, callback );
      } else {
        throw new Error(
          "Unknown pathmap specifier " + match + " in '" + spec + "'" );
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

  /**
   * Perform the pathmap replacement operations on the given
   * string. The patterns take the form 'pat1,rep1;pat2,rep2...'.
   */
  pathmap.replace = function( str, patterns, callback ){
    if( typeof patterns == 'undefined' ) return str;

    patterns = patterns.split( ';' );

    for( var i = 0; i < patterns.length; i++ ){
      var spec        = patterns[ i ].split( ',' )
        , pattern     = new RegExp( spec[ 0 ] )
        , replacement = spec[ 1 ];

      if( replacement == '*' && callback ){
        str = str.replace( pattern, callback );
      } else if( typeof replacement == 'undefined' ){
        str = str.replace( pattern, '' );
      } else {
        str = str.replace( pattern, replacement );
      }
    }

    return str;
  };

  var patterns = {

    /**
     * The complete path.
     */
    'p' : function( replace, count, callback ){
      return pathmap.replace(
        this, replace, callback );
    },

    /**
     * The base file name of the path, with its file extension,
     * but without any directories.
     */
    'f' : function( replace, count, callback ){
      return pathmap.replace(
        pathmap.basename( this ), replace, callback );
    },

    /**
     * The file name of the path without its file extension.
     */
    'n' : function( replace, count, callback ){
      return pathmap.replace(
        pathmap.basename( this, pathmap.extname( this ) ), replace, callback );
    },

    /**
     * The directory list of the path.
     */
    'd' : function( replace, count, callback ){
      return pathmap.replace(
        pathmap.dirname( this, count ), replace, callback );
    },

    /**
     * The file extension of the path. An empty string if there
     * is no extension.
     */
    'x' : function( replace, count, callback ){
      return pathmap.replace(
        pathmap.extname( this ), replace, callback );
    },

    /**
     * Everything but the file extension.
     */
    'X' : function( replace, count, callback ){
      return pathmap.replace(
        pathmap.chomp( this, pathmap.extname( this ) ), replace, callback );
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
