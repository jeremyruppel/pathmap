# pathmap

Rake's [pathmap](http://devblog.avdi.org/2014/04/24/rake-part-4-pathmap/) for JavaScript. Think of it like `sprintf` for paths.

> [![NPM version][npm-badge]][npm]
> [![Build Status][travis-badge]][travis-ci]

## Usage

`pathmap` accepts a path and a pathmap spec and returns a formatted string.

``` js
var pathmap = require('pathmap');

pathmap('a/b/c/d/file.txt', 'rm %f'); // => 'rm file.txt'
pathmap('file.coffee', 'mv %p %X.js'); // => 'mv file.coffee file.js'
```

The following patterns are supported:

- `%p` - The complete path.
- `%f` - The base file name of the path, with its file extension, but without any directories.
- `%n` - The file name of the path without its file extension.
- `%d` - The directory list of the path.
- `%x` - The file extension of the path. An empty string if there is no extension.
- `%X` - Everything but the file extension.
- `%s` - The file separator. This can be configured by setting `pathmap.sep`.
- `%%` - A percent sign.

The `%d` pattern supports a `count` argument to specify the number of directories to return from either side.

``` js
pathmap('a/b/c/d/file.txt', '%2d'); // => 'a/b'
pathmap('a/b/c/d/file.txt', '%-2d'); // => 'c/d'
```

`%p`, `%f`, `%n`, `%d`, `%x` and `%X` support a replacement argument that can be used to replace portions of the resulting string. The pattern looks like "{old,new}".

``` js
pathmap('file.md', '%X%{md,mdown}x'); // => 'file.mdown'
```

## License

[MIT License][LICENSE]

[npm]: http://badge.fury.io/js/pathmap
[npm-badge]: https://badge.fury.io/js/pathmap.svg
[travis-ci]: https://travis-ci.org/jeremyruppel/pathmap
[travis-badge]: https://travis-ci.org/jeremyruppel/pathmap.svg?branch=master
[LICENSE]: https://github.com/jeremyruppel/pathmap/blob/master/LICENSE
