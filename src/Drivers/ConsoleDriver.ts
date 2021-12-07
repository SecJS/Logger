import { Env } from '@secjs/env'
import { Color } from '../utils/Color'
import { format } from '../utils/format'
import { File, Path } from '@secjs/utils'
import { DriverContract } from '../Contracts/DriverContract'
import { getConfigFile } from '../utils/getConfigFile'

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
    const configFile = getConfigFile()

    const channelConfig = configFile.channels[channel]

    this._level = channelConfig.level || 'INFO'
    this._context = channelConfig.context || 'ConsoleDriver'
    this._formatter = channelConfig.formatter || 'context'
    this._streamType = channelConfig.streamType || 'stdout'
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

new ConsoleDriver('debug')
