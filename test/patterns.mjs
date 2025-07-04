// @ts-check
import { describe, it } from "node:test"
import pathmap from "../index.mjs"
import assert from "node:assert"

describe("patterns", function () {
  it("exposes the default patterns", function () {
    assert.equal(typeof pathmap.patterns["p"], "function")
    assert.equal(typeof pathmap.patterns["f"], "function")
    assert.equal(typeof pathmap.patterns["n"], "function")
    assert.equal(typeof pathmap.patterns["d"], "function")
    assert.equal(typeof pathmap.patterns["x"], "function")
    assert.equal(typeof pathmap.patterns["X"], "function")
    assert.equal(typeof pathmap.patterns["s"], "function")
    assert.equal(typeof pathmap.patterns["%"], "function")
  })

  it("throws if an undefined pattern is given", function () {
    assert.throws(function () {
      pathmap("a/b/c/d/file.txt", "%q")
    }, 'Unknown pathmap specifier q in "%q"')
  })

  it("allows new patterns to be added", function () {
    pathmap.patterns["z"] = function () {
      return "ZZZ"
    }
    assert.equal(pathmap("a/b/c/d/file.txt", "%d/%z%x"), "a/b/c/d/ZZZ.txt")
    delete pathmap.patterns["z"]
  })
})
