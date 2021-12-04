import { Config } from '@secjs/config'
import { Color } from '../utils/Color'
import { Formatters } from '../Formatters/Formatters'
import { DriverContract } from '../Contracts/DriverContract'
import { FormatterContract } from '../Contracts/FormatterContract'

export interface ConsoleDriverOpts {
  color: Color
  level: string
  context: string
}

export class ConsoleDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  private readonly _streamType: string

  constructor(channel: string) {
    this._level = Config.get(`logging.channel.${channel}.level`)
    this._context = Config.get(`logging.channel.${channel}.context`)
    this._formatter = Config.get(`logging.channel.${channel}.formatter`)
    this._streamType = Config.get(`logging.channel.${channel}.streamType`)
  }

  transport(message: string, options?: ConsoleDriverOpts): void {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        streamType: this._streamType,
      },
      options,
    )

    const Formatter = this.getFormatter()

    message = Formatter.format(message, {
      color: options.color,
      level: options.level,
      context: options.context,
    })

    process[this._streamType].write(`${message}\n`)
  }

  private getFormatter(): FormatterContract {
    const Formatter = Formatters[this._formatter]

    if (!Formatter) throw new Error(`Formatter ${this._formatter} not found`)

    return new Formatter()
  }
}
