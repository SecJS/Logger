import { parse } from 'path'
import { Path } from '@secjs/utils'
import { Color } from '../utils/Color'
import { Config } from '@secjs/config'
import { DriverContract } from '../Contracts/DriverContract'
import { createWriteStream, existsSync, mkdirSync } from 'fs'

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
    const config = Config.get(`logging.channels.${channel}`) || {}

    this._level = config.level || 'INFO'
    this._context = config.context || 'FileDriver'
    this._filePath = config.filePath || Path.noBuild().logs('secjs.log')
    this._formatter = config.formatter || 'log'
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
