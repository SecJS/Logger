import { parse } from 'path'
import { Env } from '@secjs/env'
import { Color } from '../utils/Color'
import { File, Path } from '@secjs/utils'
import { DriverContract } from '../Contracts/DriverContract'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { getConfigFile } from '../utils/getConfigFile'

export interface FileDriverOpts {
  level: string
  context: string
  formatter: string
  filePath: string
}

export class FileDriver implements DriverContract {
  private readonly _level: string
  private readonly _context: string
  private readonly _filePath: string
  private readonly _formatter: string

  constructor(channel: string) {
    const configFile = getConfigFile()

    const channelConfig = configFile.channels[channel]

    this._level = channelConfig.level || 'INFO'
    this._context = channelConfig.context || 'FileDriver'
    this._filePath = channelConfig.filePath || Path.noBuild().logs('secjs.log')
    this._formatter = channelConfig.formatter || 'log'
  }

  transport(message: string, options?: FileDriverOpts): void {
    options = Object.assign(
      {},
      { level: this._level, context: this._context, filePath: this._filePath },
      options,
    )

    const path = parse(options.filePath)

    if (!existsSync(path.dir)) {
      mkdirSync(path.dir, { recursive: true })
    }

    const stream = createWriteStream(options.filePath, { flags: 'a' })

    stream.write(`${Color.removeColors(message)}` + '\n')

    stream.on('error', err => {
      throw err
    })

    stream.end()
  }
}
