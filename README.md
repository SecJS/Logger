# Logger 🔍

> Logger to any NodeJS project

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/logger.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/logger/stargazers/)

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/logger?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/logger?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a `Logger` package to any NodeJS project.

<img src=".github/logger.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

```bash
yarn add @secjs/logger
```

## Usage

### Log / Logger

> Log any type of requests in your application in public mode

```js
import { Log, Logger } from '@secjs/logger'

Log('Hello World!', 'Context')
// [SecJS] 38114 - dd/mm/yyyy, hh:mm:ss PM [Context] Hello World!

const logger = new Logger('Context')

logger.log('Hello World!')
// [SecJS] 38114 - dd/mm/yyyy, hh:mm:ss PM [Context] Hello World!

logger.log('Hello World!', 'DiffContext')
// [SecJS] 38114 - dd/mm/yyyy, hh:mm:ss PM [DiffContext] Hello World!
```

### Debug / Debugger

> Log any type of requests in your application in private mode only by DEBUG Env

> **IMPORTANT NOTE**: Debug logs will only show up if you run your
application with **DEBUG environment** set, if you set **Debugger**
namespace as api:main you can set **DEBUG=*** or **DEBUG=api:*** to show
all your logs.

> **Example:** DEBUG=api:* yarn start

```js
import { Debug, Debugger } from '@secjs/logger'

Debug('Hello World!', 'api:main', 'Context')
// api:main [SecJS Debugger] 38114 - dd/mm/yyyy, hh:mm:ss AM [SomeContext] Hello World!
// api:main  +0ms

const debuggerr = new Debugger('api:services')

debuggerr.log({ joao: 'joao' })
// api:services [SecJS Debugger] 38114 - dd/mm/yyyy, hh:mm:ss AM Object: {
// api:services   "joao": "joao"
// api:services }
// api:services
// api:services  +0ms

debuggerr.log({ joao: 'joao' }, 'SomeContext')
// api:services [SecJS Debugger] 38114 - dd/mm/yyyy, hh:mm:ss AM [SomeContext] Object: {
// api:services   "joao": "joao"
// api:services }
// api:services
// api:services  +0ms
```

---
