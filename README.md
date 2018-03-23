# Private Key Space Wallet - Core Service
A multi-signature, HD Bitcoin wallet service.

## Usage

Setting up:
  * install [nvm](https://github.com/creationix/nvm) - node.js version manager (recommended)
  * install [node.js](https://nodejs.org/en/) - JavaScript runtime
  * install [yarn](https://yarnpkg.com/) - node.js package manager
  * copy `.env.example` into `.env` and edit for desired build/run configuration

Desired `node.js` version is indicated by `.nvmrc` file.
Install it with `nvm`:
```bash
$ nvm install
```

Following commands expect that desired node.js version is set as default version used system-wide.

Install dependencies:
```bash
$ make install
```

Create build:
```bash
$ make build
```

Run development server (depends on build):
```bash
$ make run
```

Run tests:
```bash
$ make test
```

Run tests in CI mode:
```bash
$ make test-ci
```

Migrate database up (depends on build, specify environment with `NODE_ENV`):
```bash
$ NODE_ENV=development make migratedb-up
```

Migrate database down (depends on build, specify environment with `NODE_ENV`):
```bash
$ NODE_ENV=development make migratedb-up
```

Refresh database (depends on build, specify environment with `NODE_ENV`):
```bash
$ NODE_ENV=development make migratedb-refresh
```

Run typecheck:
```bash
$ make typecheck
```

Run lint and display errors:
```bash
$ make lint
```

Run lint and fix errors:
```bash
$ make lint-enforce
```

## Licence

[MIT](http://en.wikipedia.org/wiki/MIT_License)
