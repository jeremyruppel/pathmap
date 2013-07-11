( function( exports ){

  /**
   *
   */
  function pathmap( path, spec ){
    return spec.replace( /%(.*)/g, function( match, pattern ){
      if( patterns[ pattern ] ){
        return patterns[ pattern ].call( path );
      } else {
        throw new Error( "Unknown pathmap specifier " + match + " in '" + spec + "'" );
      }
    } );
  };

  pathmap.dirname = function( path ){
    var match = /((?:\w+\/?)+)(?=\/)/.exec( path );
    return match ? match[ 1 ] : '.';
  };

  /**
   * Returns the base filename of `path`, removing the
   * extension `ext` if given.
   */
  pathmap.basename = function( path, ext ){
    path = this.chomp( path, '/' );
    path = this.chomp( path, ext );

    return path.split( '/' ).pop( );
  };

  /**
   * Returns the extension of `path`, or an empty string
   * if there isn't one.
   */
  pathmap.extname = function( path ){
    var match = /(\.\w+)$/.exec( path );
    return match ? match[ 1 ] : '';
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
    'd' : function( ){
      return pathmap.dirname( this );
    }
  };

  /**
   * Export!
   */
  exports.pathmap = pathmap;

} )( typeof window != 'undefined' ? window : exports );
