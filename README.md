[![travis][travis-image]][travis-url]
[![dep][dep-image]][dep-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/nathan7/level-promise.svg?style=flat
[travis-url]: https://travis-ci.org/nathan7/level-promise
[dep-image]: https://img.shields.io/gemnasium/nathan7/level-promise.svg?style=flat
[dep-url]: https://gemnasium.com/nathan7/level-promise
[npm-image]: https://img.shields.io/npm/v/level-promise.svg?style=flat
[npm-url]: https://npmjs.org/package/level-promise

# level-promise

  Promised LevelUp.

## Installation

    $ npm install level-promise

## Warning

  At the application level, promises vs callbacks is yours to choose.
  If you use this in a *LevelUp extension* that isn't explicitly about promises, I will find you and I will destroy you.
  Play nice with the rest, use callbacks for your extension.
  If your extension works with level-manifest, it'll work with this.

## Usage

  `LevelPromise(db)` (or `LevelPromise.install(db)`, if that suits your tastes) and you're off!
  Every method marked as async by level-manifest will now return a promise when you don't pass it a callback.
  It recurses into sublevels.

## License

  MIT
