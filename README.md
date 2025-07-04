# pathmap

Rake's [pathmap](http://devblog.avdi.org/2014/04/24/rake-part-4-pathmap/) for JavaScript. Think of it like `sprintf` for paths.

## install

```bash
$ npm install pathmap
```

## usage

`pathmap` accepts a path and a pathmap spec and returns a formatted string.

```typescript
import pathmap from "pathmap"

pathmap("a/b/c/d/file.txt", "rm %f") // => 'rm file.txt'
pathmap("file.coffee", "mv %p %X.js") // => 'mv file.coffee file.js'
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

```js
pathmap("a/b/c/d/file.txt", "%2d") // => 'a/b'
pathmap("a/b/c/d/file.txt", "%-2d") // => 'c/d'
```

`%p`, `%f`, `%n`, `%d`, `%x` and `%X` support a replacement argument that can be used to replace portions of the resulting string. The pattern looks like "{old,new}".

```js
pathmap("file.md", "%X%{md,mdown}x") // => 'file.mdown'
```

## functions

`function chomp(path: string, string: string): string`

Removes the specified string from the end of the path.

```typescript
import { chomp } from "pathmap"

chomp("a/b/c/d/file.txt", "file.txt") // => 'a/b/c/d/'
```

`function dirname(path: string, count: number): string`

Returns the directory name of the path, optionally with a count of directories to return.

```typescript
import { dirname } from "pathmap"

dirname("a/b/c/d/file.txt", 2) // => 'a/b'
dirname("a/b/c/d/file.txt", -2) // => 'c/d'
```

`function basename(path: string, ext?: string): string`

Returns the base file name of the path, optionally with a specified file extension.

```typescript
import { basename } from "pathmap"

basename("a/b/c/d/file.txt") // => 'file.txt'
basename("a/b/c/d/file.txt", ".txt") // => 'file'
```

`function extname(path: string): string`

Returns the file extension of the path, or an empty string if there is no extension.

```typescript
import { extname } from "pathmap"

extname("a/b/c/d/file.txt") // => '.txt'
extname("a/b/c/d/file") // => ''
```

`function replace(str: string, patterns: string, callback?: (substring: string,
...args: any[]) => string): string`

Replaces patterns in a string based on the provided patterns. The patterns are specified in the form of `pat1,rep1;pat2,rep2...`.

```typescript
import { replace } from "pathmap"

replace("a/b/c/d/file.txt", "a,alpha;b,beta") // => 'alpha/beta/c/d/file.txt'
replace("a/b/c/d/file.txt", "a,alpha;b,beta", (substring) =>
  substring.toUpperCase(),
) // => 'ALPHA/BETA/c/d/file.txt'
```

## license

[MIT License][LICENSE]

[LICENSE]: https://github.com/jeremyruppel/pathmap/blob/master/LICENSE
