import { Path } from '@secjs/utils'
import { Color } from '../utils/Color'
import { DriverContract } from '../Contracts/DriverContract'
import { createWriteStream, existsSync, mkdirSync } from 'fs'

export interface FileDriverOpts {
  filePath: string
}

export class FileDriver implements DriverContract {
  transport(message: string, options?: FileDriverOpts): void {
    options = Object.assign(
      {},
      { filePath: Path.noBuild().logs('secjs.log') },
      options,
    )

    if (!existsSync(options.filePath)) {
      mkdirSync(options.filePath, { recursive: true })
    }

    const stream = createWriteStream(options.filePath, { flags: 'a' })

    stream.write(`${Color.removeColors(message)}` + '\n')

    stream.on('error', err => {
      throw err
    })

    stream.end()
  }
}
