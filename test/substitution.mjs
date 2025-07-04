import { describe, it } from "node:test"
import pathmap from "../index.mjs"
import assert from "node:assert"

describe("substitution", function () {
  it("returns the complete path", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%p"), "a/b/c/d/file.txt")
  })

  it("returns the base file name of the path, with its file extension, but without any directories", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%f"), "file.txt")
  })

  it("returns the file name of the path without its file extension", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%n"), "file")
  })

  it("returns the directory list of the path", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%d"), "a/b/c/d")
  })

  it("returns the extension of the path", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%x"), ".txt")
  })

  it("returns everything but the extension of the path", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%X"), "a/b/c/d/file")
  })

  it("returns the file separator", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%s"), "/")
  })

  it("returns a literal percent sign", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%%"), "%")
  })
})
