import {
  InternalServerException,
  NotImplementedException,
} from '@secjs/exceptions'

import { Config } from '@secjs/config'
import { Color } from './utils/Color'
import { Drivers } from './Drivers/Drivers'
import { Formatters } from './Formatters/Formatters'
import { DriverContract } from './Contracts/DriverContract'
import { FormatterContract } from './Contracts/FormatterContract'

export class Logger {
  private _tempDrivers: DriverContract[] | null = null
  private _defaultDriver: DriverContract | null = null

  static buildDriver(name: string, driver: DriverContract) {
    if (Drivers[name]) {
      throw new InternalServerException(`Driver ${name} already exists`)
    }

    Drivers[name] = driver
  }

  static buildFormatter(name: string, formatter: FormatterContract) {
    if (Formatters[name]) {
      throw new InternalServerException(`Formatter ${name} already exists`)
    }

    Formatters[name] = formatter
  }

  static get drivers(): string[] {
    return Object.keys(Drivers)
  }

  static get formatters(): string[] {
    return Object.keys(Formatters)
  }

  constructor() {
    const defaultChannel = Config.get('logging.default')
    const channelConfig = Config.get(`logging.channels.${defaultChannel}`)

    this._defaultDriver = new Drivers[channelConfig.driver](defaultChannel)
  }

  private _driver(message: any, options?: any) {
    if (this._tempDrivers && this._tempDrivers.length) {
      this._tempDrivers.forEach(tempDriver => {
        tempDriver.transport(message, options)
      })

      return
    }

    this._defaultDriver.transport(message, options)
  }

  changeDefaultChannel(channel: string): Logger {
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

  channel(channel: string): Logger {
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

  channels(...channels: string[]): Logger {
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

  log(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    this._driver(message, options)

    this._tempDrivers = []
  }

  info(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'INFO'
    options.color = Color.cyan
    options.streamType = 'stdout'

    this._driver(message, options)

    this._tempDrivers = []
  }

  warn(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'WARN'
    options.color = Color.orange
    options.streamType = 'stdout'

    this._driver(message, options)

    this._tempDrivers = []
  }

  error(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'ERROR'
    options.color = Color.red
    options.streamType = 'stderr'

    this._driver(message, options)

    this._tempDrivers = []
  }

  debug(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'DEBUG'
    options.color = Color.purple
    options.streamType = 'stdout'

    this._driver(message, options)

    this._tempDrivers = []
  }

  success(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'SUCCESS'
    options.color = Color.green
    options.streamType = 'stdout'

    this._driver(message, options)

    this._tempDrivers = []
  }
}