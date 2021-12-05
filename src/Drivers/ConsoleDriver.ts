import { Config } from '@secjs/config'
import { Color } from '../utils/Color'
import { format } from '../utils/format'
import { DriverContract } from '../Contracts/DriverContract'

export interface ConsoleDriverOpts {
  color: Color
  level: string
  context: string
  streamType: string
}

export class ConsoleDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  private readonly _streamType: string

  constructor(channel: string) {
    const config = Config.get(`logging.channels.${channel}`) || {}

    this._level = config.level || 'INFO'
    this._context = config.context || 'ConsoleDriver'
    this._formatter = config.formatter || 'context'
    this._streamType = config.streamType || 'stdout'
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

    message = format(this._formatter, message, options)

    process[this._streamType].write(`${message}\n`)
  }
}