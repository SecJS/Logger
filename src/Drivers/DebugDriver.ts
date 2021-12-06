import { debug } from 'debug'
import { Color } from '../utils/Color'
import { Config } from '@secjs/config'
import { format } from '../utils/format'
import { DriverContract } from '../Contracts/DriverContract'

export interface DebugDriverOpts {
  color: Color
  level: string
  context: string
  formatter: string
  namespace: string
}

export class DebugDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _formatter: string
  private readonly _namespace: string

  constructor(channel: string) {
    const config = Config.get(`logging.channels.${channel}`) || {}

    this._level = config.level || 'DEBUG'
    this._context = config.context || 'DebugDriver'
    this._formatter = config.formatter || 'context'
    this._namespace = config.namespace || 'api:main'
  }

  transport(message: string, options?: DebugDriverOpts): void {
    options = Object.assign(
      {},
      {
        level: this._level,
        context: this._context,
        namespace: this._namespace,
      },
      options,
    )

    message = format(this._formatter, message, options)

    debug(options.namespace)(message)
  }
}
