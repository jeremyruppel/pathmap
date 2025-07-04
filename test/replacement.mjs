import { describe, it } from "node:test"
import pathmap from "../index.mjs"
import assert from "node:assert"

describe("replacement", function () {
  it("supports replacement for %d", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{a,A}d"), "A/b/c/d")
  })

  it("supports replacement and partials for %d", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{a,A}2d"), "A/b")
  })

  it("supports replacement for %p", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{a,A}p"), "A/b/c/d/file.txt")
  })

  it("supports replacement for %f", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{txt,js}f"), "file.js")
  })

  it("supports replacement for %n", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{ile,ood}n"), "food")
  })

  it("supports replacement for %x", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{xt,ext}x"), ".text")
  })

  it("supports replacement for %X", function () {
    assert.equal(pathmap("a/b/c/d/file.txt", "%{a,A}X"), "A/b/c/d/file")
  })

  describe("callbacks", function () {
    it("supports replacement callbacks for %d", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{a,*}d", function () {
          return "A"
        }),
        "A/b/c/d",
      )
    })

    it("supports replacement callbacks and partials for %d", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{a,*}2d", function () {
          return "A"
        }),
        "A/b",
      )
    })

    it("supports replacement callbacks for %p", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{a,*}p", function () {
          return "A"
        }),
        "A/b/c/d/file.txt",
      )
    })

    it("supports replacement callbacks for %f", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{txt,*}f", function () {
          return "js"
        }),
        "file.js",
      )
    })

    it("supports replacement callbacks for %n", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{ile,*}n", function () {
          return "ood"
        }),
        "food",
      )
    })

    it("supports replacement callbacks for %x", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{xt,*}x", function () {
          return "ext"
        }),
        ".text",
      )
    })

    it("supports replacement callbacks for %X", function () {
      assert.equal(
        pathmap("a/b/c/d/file.txt", "%{a,*}X", function () {
          return "A"
        }),
        "A/b/c/d/file",
      )
    })
  })
})
