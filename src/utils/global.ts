import { DriverContract } from '../Contracts/DriverContract'
import { FormatterContract } from '../Contracts/FormatterContract'

export {}

declare global {
  class Log {
    static buildDriver(name: string, driver: DriverContract): typeof Log
    static buildFormatter(
      name: string,
      formatter: FormatterContract,
    ): typeof Log

    static get drivers(): string[]
    static get formatters(): string[]
    static changeDefaultChannel(channel: string): typeof Log
    static channel(channel: string): typeof Log
    static channels(...channels: string[]): typeof Log

    static log(message: any, options?: any)
    static info(message: any, options?: any)
    static warn(message: any, options?: any)
    static error(message: any, options?: any)
    static debug(message: any, options?: any)
    static success(message: any, options?: any)
  }
}

const _global = global as any

_global.Log = Log
