# pathmap.js

Rake's [#pathmap](http://rake.rubyforge.org/classes/String.html#M000017) method
for JavaScript. Think of it like `sprintf` for paths.

## Usage

`pathmap` accepts a path and a pathmap spec and returns a formatted string.

``` js
pathmap( 'a/b/c/d/file.txt', 'rm %f' ); // => 'rm file.txt'
pathmap( 'file.coffee', 'mv %p %X.js' ); // => 'mv file.coffee file.js'
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
pathmap( 'a/b/c/d/file.txt', '%2d' ); // => 'a/b'
pathmap( 'a/b/c/d/file.txt', '%-2d' ); // => 'c/d'
```

`%p`, `%f`, `%n`, `%d`, `%x` and `%X` support a replacement argument that can be used to replace portions of the resulting string. The pattern looks like "{old,new}".

``` js
pathmap( 'file.md', '%X%{md,mdown}x' ); // => 'file.mdown'
```

## License

pathmap.js is released under the MIT license.

Though no code was taken directly from it, the concepts, behavior, patterns, and some comments are were originally created by Jim Weirich and can be found in the excellent [rake](http://rake.rubyforge.org/) library, also MIT licensed.
