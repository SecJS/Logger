# Logger 🔍

> Logger to any NodeJS project

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/logger.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/logger/stargazers/)

<p>
    <a href="https://www.buymeacoffee.com/secjs" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</p>

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/secjs/logger?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/secjs/logger?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">

  <img alt="Commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a `Logger` package to any NodeJS project.

<img src=".github/logger.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

```bash
npm install @secjs/logger
```

## Usage

### Config logging template

> First you need to create the configuration file logging in the config folder on project root path. Is extremely important to use export default in these configurations.

```ts
import { Env } from '@secjs/env'
import { Path } from '@secjs/utils'

export default {
  /*
  |--------------------------------------------------------------------------
  | Default Log Channel
  |--------------------------------------------------------------------------
  |
  | This option defines the default log channel that gets used when writing
  | messages to the logs. The name specified in this option should match
  | one of the channels defined in the "channels" configuration object.
  |
  */

  default: Env('LOGGING_CHANNEL', 'application'),

  /*
  |--------------------------------------------------------------------------
  | Log Channels
  |--------------------------------------------------------------------------
  |
  | Here you may configure the log channels for your application.
  |
  | Available Drivers: "console", "debug", "file".
  | Available Formatters: "context", "debug", "json", "log".
  |
  */

  channels: {
    application: {
      driver: 'console',
      context: 'Logger',
      formatter: 'context',
    },
    debug: {
      driver: 'debug',
      context: 'Debugger',
      formatter: 'context',
      namespace: 'api:main',
    },
    file: {
      driver: 'file',
      context: 'Logger',
      formatter: 'log',
      filePath: Path.noBuild().logs('secjs.log'),
    },
  },
}
```

### Log / Logger

> With the config/logging file created you can use Log and Logger classes to start logging.

```ts
import { Log, Logger, Color } from '@secjs/logger'

// Log and Logger will always use the default values of channel inside config/logging, the default channel in here is "application".
Log.log('Hello World!')
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [Logger] Hello World! +0ms

const logger = new Logger()

logger.success('Hello World!')
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [Logger] Hello World! +0ms

// You can pass options to formatters and drivers as second parameter
logger.warn('Hello World!', { color: Color.purple, context: 'LogController' })
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [LogController] Hello World! +0ms
```

### Using other channels

> You can use any channel that you configure inside config/logging, SecJS has default channels inside the template file.

```ts
Log.channel('debug').log('Hello debug world!', { namespace: 'api:example' })
// api:example [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [Debugger] Hello debug world! +0ms
```

> You can use many channels to handle the log in all of then

```ts
Log.channels('debug', 'application', 'file').info('Hello World!', { namespace: 'api:example' })
// api:example [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [Debugger] Hello World! +0ms
// [SecJS] - PID: 38114 - dd/mm/yyyy, hh:mm:ss PM [Logger] Hello World! +0ms

// In storage/logs/secjs.log file 
// [SecJS] - PID: 196416 - dd/mm/yyyy, hh:mm:ss [INFO] Hello World!
```

### Extending drivers, channels and formatters

> Nowadays, @secjs/logger has only FileDriver, DebugDriver and ConsoleDriver support, but you can extend the drivers for Logger class if you implement DriverContract interface.

```ts
import { DriverContract, FormatterContract, format } from '@secjs/logger'

interface CustomDriverOpts {}

class CustomDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  
  constructor(channel: string) {
    const config = Config.get(`logging.channels.${channel}`)
    
    this._level = config.level || 'INFO'
    this._context = config.context || 'CustomDriver'
    this._formatter = config.formatter || 'context'
  }

  transport(message: string, options?: CustomDriverOpts): void {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        streamType: this._streamType,
      },
      options,
    )

    message = format(this._formatter, message, options)

    process[this._streamType].write(`${message}\n`)
  }
}
```

> Same to extend formatters

```ts
class CustomFormatter implements FormatterContract {
  // all the methods implemented from FormatterContract...
}
```

> Constructor is extremely important in your CustomDriver class, it's the constructor that will use the values from config/logging channels to manipulate your CustomDriver using channel and channels method from logger. 
> So if you are building a CustomDriver, and you want to use it, you can create a new channel inside config/logging channels or change the driver from an existing channel.

```ts
// extending channels
// config/logging file

export default {
  // default etc...
  
  channels: {
    mychannel: {
      driver: 'custom',
      level: 'INFO',
      formatter: 'context',
      context: 'Logger',
    }
    // ... other disks
  }
}
```

> Now you can build your new driver using Logger class

```ts
const driverName = 'custom'
const formatterName = 'custom'
const driver = CustomDriver
const formatter = CustomFormatter

Logger.buildDriver(driverName, driver)
Logger.buildFormatter(formatterName, CustomFormatter)

console.log(Logger.drivers) // ['console', 'debug', 'file', 'custom']
console.log(Logger.formatters) // ['context', 'debug', 'json', 'log', 'custom']
```

> Now, if you have implemented your channel in config/logging, you can use him inside logger

```ts
// options of your driver and formatter
const options = {}

// Will use CustomDriver to handle the log actions
logger.channel('mychannel').success('Hello World!!', options)
```

---

## License

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
