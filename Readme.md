
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
