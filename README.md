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
npm install @secjs/logger
```

## Usage

### Log / Logger

> Log any type of requests in your application in public mode

```ts
import { Log, Logger } from '@secjs/logger'

Log('Hello World!')
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [Log] Hello World! +0ms

const logger = new Logger('LogService')

logger.success('Hello World!')
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [LogService] Hello World! +0ms

logger.warn('Hello World!', { context: 'LogController' })
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [LogController] Hello World! +0ms
```

### Formatters / Transporters / LogMapper

> Use transporters and formatters to keep a pattern in how the application will handle the logs. And use mappers 
> to set formatters and transporters that are going to be used. See the example:

```ts
import {
  LogMapper,
  JsonFormatter,
  FileTransporter,
  ContextFormatter,
  changeLogFnMapper,
  ConsoleTransporter,
} from '@secjs/logger'

const logMapper = new LogMapper([new JsonFormatter()], [new FileTransporter()])

// This function is important to change the default mapper from Log function
changeLogFnMapper(logMapper)
const logger = new Logger('Context', logMapper)

// You can use addFormatter and addTransporter to add more formatters and transporters
logMapper.addFormatter(new ContextFormatter('Context'))
logMapper.addTransporter(new ConsoleTransporter('stdout'))

// You can use removeFormatter and removeTransporter too.
logMapper.removeFormatter(ContextFormatter)
logMapper.removeTransporter(ConsoleTransporter)
```

> Now Log function and Logger class will use the logMapper instance, 
> all logs will be stringify by JsonFormatter, and be saved inside FileTransporter.

### Custom formatters and transporters

> Here are all the already implemented formatters and transporters from @secjs/logger

```ts
import {
  LogFormatter,
  JsonFormatter,
  DebugFormatter,
  ContextFormatter,
  FileTransporter,
  DebugTransporter,
  ConsoleTransporter,
} from '@secjs/logger'
```

> You can define your own formatters and transporters using the contracts

```ts
import { FormatterContract, TransporterContract } from '@secjs/logger'

export class CustomFormatter implements FormatterContract {
  format(message: any, options?: any) {
    createFileToTransportToS3(message, options.filePath)
    
    deleteTheFile(options.filePath)
  }
}

export class CustomTransporter implements TransporterContract {
  transport(logFormatted: any, options?: any) {
    sendToS3(logFormatted, options.s3Bucket)
  }
}
```

> Then, use it with the mappers

```ts
import { LogMapper } from '@secjs/logger'

const s3LogMapper = new LogMapper([new CustomFormatter()], [new CustomFormatter()])

const s3Logger = new Logger('S3LoggerService', s3LogMapper)
```

---

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
