// @ts-check
/**
 * Matches any pathmap patterns, with the following capture groups:
 * 1: An optional replacement spec.
 * 2: An optional count.
 * 3: The pathmap pattern identifier.
 */
const regexp = /%(?:\{([^}]*)\})?(-?\d+)?([\w%])/g

/**
 * Removes `str` from the end of `path`.
 * @param {string} path - The path to process.
 * @param {string} str - The string to remove from the end.
 * @returns {string} The path with `str` removed from the end.
 */
export function chomp(path, str) {
  return path.replace(new RegExp(str + "$"), "")
}

/**
 * Returns the directory name of `path`. Returns '.'
 * if there is no directory part.
 * @param {string} path - The path to process.
 * @param {number} count - The number of directory levels to return.
 * If negative, counts from the end.
 * @returns {string} The directory name of the path.
 */
export function dirname(path, count) {
  const parts = chomp(path, pathmap.sep).split(pathmap.sep)

  let dirs = parts.slice(0, -1)

  if (count < 0) {
    dirs = dirs.slice(count)
  }
  if (count > 0) {
    dirs = dirs.slice(0, count)
  }
  if (dirs.length == 0) {
    return "."
  }
  if (dirs.length == 1 && dirs[0] == "") {
    return pathmap.sep
  }

  return dirs.join(pathmap.sep)
}

/**
 * Returns the base filename of `path`, removing the
 * extension `ext` if given.
 * @param {string} path - The path to process.
 * @param {string} ext - The file extension to remove.
 * @returns {string} The base filename without the extension.
 */
export function basename(path, ext = "") {
  const noext = chomp(chomp(path, pathmap.sep), ext)

  return noext.split(pathmap.sep).pop() || ""
}

/**
 * Returns the extension of `path`, or an empty string
 * if there isn't one.
 * @param {string} path - The path to process.
 * @returns {string} The file extension, including the leading dot.
 */
export function extname(path) {
  const index = path.lastIndexOf(".")

  if (index > -1) {
    return path.slice(index)
  } else {
    return ""
  }
}

/**
 * Perform the pathmap replacement operations on the given
 * string. The patterns take the form 'pat1,rep1;pat2,rep2...'.
 * @param {string} str - The string to process.
 * @param {string} patterns - The patterns to apply, in the form 'pat1,rep1;pat2,rep2...'.
 * @param {(substring: string, args: any[]) => string} callback - A callback function for replacements.
 * If the replacement is '*', this callback will be called for each match.
 * If the replacement is undefined, the match will be removed.
 * @return {string} The processed string with replacements applied.
 */
export function replace(str, patterns, callback) {
  if (typeof patterns == "undefined") {
    return str
  }

  const specs = patterns.split(";")

  for (var i = 0; i < specs.length; i++) {
    const spec = specs[i].split(",")
    const pattern = new RegExp(spec[0])
    const replacement = spec[1]

    if (replacement == "*" && callback) {
      str = str.replace(pattern, callback)
    } else if (typeof replacement == "undefined") {
      str = str.replace(pattern, "")
    } else {
      str = str.replace(pattern, replacement)
    }
  }

  return str
}

/**
 * Maps a path to a path spec.
 * @param {string} path - The path to map.
 * @param {string} spec - The pathmap spec to use.
 * @param {function} [callback] - An optional callback function for replacements.
 * @returns {string} The mapped path.
 */
export default function pathmap(path, spec, callback) {
  return spec.replace(regexp, function (match, replace, count, token) {
    const pattern = pathmap.patterns[token]

    if (typeof pattern === "function") {
      return pattern.call(path, replace, count, callback)
    } else {
      throw new Error(
        "Unknown pathmap specifier " + match + ' in "' + spec + '"',
      )
    }
  })
}

/**
 * The path separator.
 */

pathmap.sep = "/"

/**
 * Pattern tokens
 */
pathmap.patterns = {
  /**
   * The complete path.
   * @param {string} replacement - The replacement string.
   * @param {number} count - The number of times to replace.
   * @param {(subtring: string, args: any[]) => string} callback - A callback function for replacements.
   * @this {string}
   * @returns {string}
   */
  p: function (replacement, count, callback) {
    return replace(this, replacement, callback)
  },

  /**
   * The base file name of the path, with its file extension,
   * but without any directories.
   * @param {string} replacement - The replacement string.
   * @param {number} count - The number of times to replace.
   * @param {(substring: string, args: any[]) => string} callback - A callback function for replacements.
   * @this {string}
   * @returns {string}
   */
  f: function (replacement, count, callback) {
    return replace(basename(this), replacement, callback)
  },

  /**
   * The file name of the path without its file extension.
   * @param {string} replacement - The replacement string.
   * @param {number} count - The number of times to replace.
   * @param {(substring: string, args: any[]) => string} callback - A callback function for replacements.
   * @this {string}
   * @returns {string}
   */
  n: function (replacement, count, callback) {
    return replace(basename(this, extname(this)), replacement, callback)
  },

  /**
   * The directory list of the path.
   * @param {string} replacement - The replacement string.
   * @param {number} count - The number of directory levels to return.
   * If negative, counts from the end.
   * @param {(substring: string, args: any[]) => string} callback - A callback function for replacements.
   * @this {string}
   * @returns {string}
   */
  d: function (replacement, count, callback) {
    return replace(dirname(this, count), replacement, callback)
  },

  /**
   * The file extension of the path. An empty string if there
   * is no extension.
   * @param {string} replacement - The replacement string.
   * @param {number} _ - The number of times to replace (not used).
   * @param {(substring: string, args: any[]) => string} callback - A callback function for replacements.
   * @this {string}
   * @returns {string}
   */
  x: function (replacement, _, callback) {
    return replace(extname(this), replacement, callback)
  },

  /**
   * Everything but the file extension.
   * @param {string} replacement - The replacement string.
   * @param {number} _ - The number of times to replace (not used).
   * @param {(substring: string, args: any[]) => string} callback - A callback function for replacements.
   * @this {string}
   * @returns {string}
   */
  X: function (replacement, _, callback) {
    return replace(chomp(this, extname(this)), replacement, callback)
  },

  /**
   * The alternate file separator if defined, otherwise use
   * the standard file separator.
   * @this {string}
   * @returns {string}
   */
  s: function () {
    return pathmap.sep
  },

  /**
   * A percent sign.
   * @this {string}
   * @returns {string}
   */
  "%": function () {
    return "%"
  },
}
