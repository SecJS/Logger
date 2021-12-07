import { debug } from 'debug'
import { Env } from '@secjs/env'
import { Color } from '../utils/Color'
import { format } from '../utils/format'
import { File, Path } from '@secjs/utils'
import { DriverContract } from '../Contracts/DriverContract'
import { getConfigFile } from '../utils/getConfigFile'

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
    const configFile = getConfigFile()

    const channelConfig = configFile.channels[channel]

    this._level = channelConfig.level || 'DEBUG'
    this._context = channelConfig.context || 'DebugDriver'
    this._formatter = channelConfig.formatter || 'context'
    this._namespace = channelConfig.namespace || 'api:main'
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
