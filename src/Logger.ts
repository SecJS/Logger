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
  private runtimeConfig: any
  private channelName: string
  private driver: DriverContract

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

  private createDriverInstance(channelName?: string) {
    channelName = channelName || Config.get('logging.default')

    const channelConfig = Config.get(`logging.channels.${channelName}`)

    if (!channelConfig) {
      throw new NotImplementedException(
        `Channel ${channelName} is not configured inside logging.channels object from config/logging file`,
      )
    }

    if (!Drivers[channelConfig.driver]) {
      throw new NotImplementedException(
        `Driver ${channelConfig.driver} does not exist, use Logger.build method to create a new driver`,
      )
    }

    this.channelName = channelName

    return new Drivers[channelConfig.driver](channelName, this.runtimeConfig)
  }

  constructor(runtimeConfig: any = {}) {
    this.runtimeConfig = runtimeConfig
    this.driver = this.createDriverInstance()
  }

  channel(channel: string, runtimeConfig?: any): Logger {
    if (runtimeConfig) this.runtimeConfig = runtimeConfig

    this.driver = this.createDriverInstance(channel)

    return this
  }

  async log(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    await this.driver.transport(message, options)
  }

  async info(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'INFO'
    options.color = Color.cyan
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }

  async warn(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'WARN'
    options.color = Color.orange
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }

  async error(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'ERROR'
    options.color = Color.red
    options.streamType = 'stderr'

    await this.driver.transport(message, options)
  }

  async debug(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'DEBUG'
    options.color = Color.purple
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }

  async success(message: any, options?: any) {
    options = Object.assign({}, { context: 'Logger' }, options)

    options.level = 'SUCCESS'
    options.color = Color.green
    options.streamType = 'stdout'

    await this.driver.transport(message, options)
  }
}
