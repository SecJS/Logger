import { Logger } from './Logger'
import { DriverContract } from './Contracts/DriverContract'
import { FormatterContract } from './Contracts/FormatterContract'

export class Log {
  private static logger: Logger = new Logger()

  static buildDriver(name: string, driver: DriverContract): typeof Log {
    Logger.buildDriver(name, driver)

    return this
  }

  static buildFormatter(
    name: string,
    formatter: FormatterContract,
  ): typeof Log {
    Logger.buildFormatter(name, formatter)

    return this
  }

  static get drivers(): string[] {
    return Logger.drivers
  }

  static get formatters(): string[] {
    return Logger.formatters
  }

  static channel(channel: string): typeof Log {
    this.logger.channel(channel)

    return this
  }

  static channels(...channels: string[]): typeof Log {
    this.logger.channels(...channels)

    return this
  }

  static log(message: any, options?: any) {
    this.logger.log(message, options)

    this.logger = new Logger()
  }

  static info(message: any, options?: any) {
    this.logger.info(message, options)

    this.logger = new Logger()
  }

  static warn(message: any, options?: any) {
    this.logger.warn(message, options)

    this.logger = new Logger()
  }

  static error(message: any, options?: any) {
    this.logger.error(message, options)

    this.logger = new Logger()
  }

  static debug(message: any, options?: any) {
    this.logger.debug(message, options)

    this.logger = new Logger()
  }

  static success(message: any, options?: any) {
    this.logger.success(message, options)

    this.logger = new Logger()
  }
}
