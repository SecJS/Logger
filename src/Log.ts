import { Config } from '@secjs/config'
import { Color } from './utils/Color'
import { Drivers } from './Drivers/Drivers'
import { Formatters } from './Formatters/Formatters'
import { DriverContract } from './Contracts/DriverContract'
import { NotImplementedException } from '@secjs/exceptions'

export class Log {
  private static _tempDrivers: DriverContract[] | null = null
  private static _defaultDriver: DriverContract | null = null

  static get drivers(): string[] {
    return Object.keys(Drivers)
  }

  static get formatters(): string[] {
    return Object.keys(Formatters)
  }

  private static resolveDriver() {
    const defaultChannel = Config.get('logging.default')
    const channelConfig = Config.get(`logging.channels.${defaultChannel}`)

    this._defaultDriver = new Drivers[channelConfig.driver](defaultChannel)
  }

  private static _driver(message: any, options?: any) {
    if (!this._defaultDriver) this.resolveDriver()

    if (this._tempDrivers && this._tempDrivers.length) {
      this._tempDrivers.forEach(tempDriver => {
        tempDriver.transport(message, options)
      })

      return
    }

    this._defaultDriver.transport(message, options)
  }

  static changeDefaultChannel(channel: string): typeof Log {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    if (!channelConfig) {
      throw new NotImplementedException(
        `Channel ${channel} is not configured inside logging.channels object from config/logging file`,
      )
    }

    if (!Drivers[channelConfig.driver]) {
      throw new NotImplementedException(
        `Driver ${channelConfig.driver} does not exist, use Storage.build method to create a new driver`,
      )
    }

    this._defaultDriver = new Drivers[channelConfig.driver](channel)

    return this
  }

  static channel(channel: string): typeof Log {
    const channelConfig = Config.get(`logging.channels.${channel}`)

    if (!channelConfig) {
      throw new NotImplementedException(
        `Channel ${channel} is not configured inside logging.channels object from config/logging file`,
      )
    }

    if (!Drivers[channelConfig.driver]) {
      throw new NotImplementedException(
        `Driver ${channelConfig.driver} does not exist, use Storage.build method to create a new driver`,
      )
    }

    this._tempDrivers = []

    this._tempDrivers.push(new Drivers[channelConfig.driver](channel))

    return this
  }

  static channels(...channels: string[]): typeof Log {
    this._tempDrivers = []

    channels.forEach(channel => {
      const channelConfig = Config.get(`logging.channels.${channel}`)

      if (!channelConfig) {
        throw new NotImplementedException(
          `Channel ${channel} is not configured inside logging.channels object from config/logging file`,
        )
      }

      if (!Drivers[channelConfig.driver]) {
        throw new NotImplementedException(
          `Driver ${channelConfig.driver} does not exist, use Storage.build method to create a new driver`,
        )
      }

      this._tempDrivers.push(new Drivers[channelConfig.driver](channel))
    })

    return this
  }

  static log(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    this._driver(message, options)
  }

  static info(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'INFO'
    options.color = Color.cyan
    options.streamType = 'stdout'

    this._driver(message, options)
  }

  static warn(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'WARN'
    options.color = Color.orange
    options.streamType = 'stdout'

    this._driver(message, options)
  }

  static error(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'ERROR'
    options.color = Color.red
    options.streamType = 'stderr'

    this._driver(message, options)
  }

  static debug(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'DEBUG'
    options.color = Color.purple
    options.streamType = 'stdout'

    this._driver(message, options)
  }

  static success(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'SUCCESS'
    options.color = Color.green
    options.streamType = 'stdout'

    this._driver(message, options)
  }
}

Log.log('log')
Log.info('info')
Log.debug('debug')
Log.warn('warn')
Log.error('error')
Log.success('success')
